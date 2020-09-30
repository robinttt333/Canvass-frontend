import React from "react";
import { Icon, Header, Feed, Dimmer, Loader } from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";
import { GET_POSTS_QUERY, NEW_POST_SUBSCRIPTION } from "../../graphql/Post";
import PostItem from "./PostItem";
import { useQuery } from "@apollo/client";
import PlainSegment from "../../components/PlainSegment";

const Bottom = ({ hasMore, handleMore }) => {
	return (
		<Header style={{ textAlign: "center", margin: "0" }} as="h6">
			{hasMore ? (
				<Link onClick={handleMore} to="#">
					<Icon name="redo" link />
					More
				</Link>
			) : (
				"No more posts"
			)}
		</Header>
	);
};
const PostList = () => {
	const { groupId } = useParams();
	const { subscribeToMore, loading, data, fetchMore } = useQuery(
		GET_POSTS_QUERY,
		{
			variables: {
				groupId: parseInt(groupId),
				offset: 0,
			},
		}
	);

	const [hasMore, setHasMore] = React.useState(true);
	const handleMore = () => {
		fetchMore({
			variables: {
				offset: data.getPosts.length,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (
					!fetchMoreResult ||
					!fetchMoreResult.getPosts ||
					!fetchMoreResult.getPosts.length ||
					!handleMore
				) {
					setHasMore(false);
					return prev;
				}
				return {
					getPosts: [...prev.getPosts, ...fetchMoreResult.getPosts],
				};
			},
		});
	};

	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: NEW_POST_SUBSCRIPTION,
			variables: { groupId: parseInt(groupId) },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				// new post appears when a modification is made to the posts in the cache
				// or a new post is added
				const newPost = subscriptionData.data.postAdded;
				let found = false;
				const newPosts = prev.getPosts.map((post) => {
					if (post.id === newPost.id) {
						found = true;
						return newPost;
					}
					return post;
				});

				if (!found)
					return {
						getPosts: [newPost, ...prev.getPosts],
					};
				else
					return {
						getPosts: newPosts,
					};
			},
		});
		return () => unsubscribe();
		//eslint-disable-next-line
	}, [groupId]);

	if (loading)
		return (
			<Dimmer active>
				<Loader>Loading</Loader>
			</Dimmer>
		);

	const posts = data.getPosts;

	return posts.length ? (
		<PlainSegment>
			<Feed size="large">
				{posts.map((post) => (
					<PostItem post={post} key={post.id} />
				))}
			</Feed>
			<Bottom hasMore={hasMore} handleMore={handleMore} />
		</PlainSegment>
	) : null;
};
export default PostList;

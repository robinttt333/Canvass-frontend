import React from "react";
import { Feed, Dimmer, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { GET_POSTS_QUERY, NEW_POST_SUBSCRIPTION } from "../../graphql/Post";
import PostItem from "./PostItem";
import { useQuery } from "@apollo/client";
import PlainSegment from "../../components/PlainSegment";

const PostList = () => {
	const { groupId } = useParams();
	const { subscribeToMore, loading, data } = useQuery(GET_POSTS_QUERY, {
		variables: {
			groupId: parseInt(groupId),
		},
	});
	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: NEW_POST_SUBSCRIPTION,
			variables: { groupId: parseInt(groupId) },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				const newPost = subscriptionData.data.postAdded;
				return {
					getPosts: [newPost, ...prev.getPosts],
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
		</PlainSegment>
	) : null;
};
export default PostList;

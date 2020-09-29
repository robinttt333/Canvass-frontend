import React from "react";
import { Feed } from "semantic-ui-react";
import PlainSegment from "../components/PlainSegment";
import {
	LIKE_ADDED_SUBSCRIPTION,
	LIKE_DELETED_SUBSCRIPTION,
	GET_POST_QUERY,
} from "../graphql/Post";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import PostItem from "../containers/Post/PostItem";

const Post = () => {
	const { postId } = useParams();
	const { loading, data, subscribeToMore } = useQuery(GET_POST_QUERY, {
		variables: { postId: parseInt(postId) },
	});
	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: LIKE_DELETED_SUBSCRIPTION,
			variables: { postId: parseInt(postId) },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				const post = subscriptionData.data.likeDeleted;
				return {
					getPost: post,
				};
			},
		});
		return () => unsubscribe();
		//eslint-disable-next-line
	}, [postId]);

	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: LIKE_ADDED_SUBSCRIPTION,
			variables: { postId: parseInt(postId) },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				const post = subscriptionData.data.likeAdded;
				return {
					getPost: post,
				};
			},
		});
		return () => unsubscribe();
		//eslint-disable-next-line
	}, [postId]);

	if (loading) return null;
	const post = data.getPost;
	return (
		<PlainSegment>
			<Feed size="large">
				<PostItem post={post} key={post.id} />
			</Feed>
		</PlainSegment>
	);
};
export default Post;

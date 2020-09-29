import React from "react";
import { Feed } from "semantic-ui-react";
import PlainSegment from "../components/PlainSegment";
import { GET_POST_QUERY } from "../graphql/Post";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import PostItem from "../containers/Post/PostItem";

const Post = () => {
	const { postId } = useParams();
	const { loading, data } = useQuery(GET_POST_QUERY, {
		variables: { postId: parseInt(postId) },
	});
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

import React from "react";
import { Icon, Feed } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import {
	GET_POST_QUERY,
	GET_POSTS_QUERY,
	TOGGLE_LIKE_MUTATION,
} from "../../graphql/Post";
import { useMutation } from "@apollo/client";
import CommentListWrapper from "../Comment/CommentListWrapper";
import { getRelativeTime } from "../../util";
import ReactMarkdown from "react-markdown";

const PostItem = ({
	post: {
		author: {
			username,
			id: userId,
			profile: { dp },
		},
		id,
		likes,
		liked,
		content,
		createdAt,
	},
}) => {
	const { groupId } = useParams();
	const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION);
	const handleLiked = async (postId) => {
		toggleLike({
			variables: { postId },
			// update cache
			update: (proxy) => {
				if (groupId) {
					const data = proxy.readQuery({
						query: GET_POSTS_QUERY,
						variables: { groupId: parseInt(groupId) },
					});
					const cachedPosts = data.getPosts;
					const updatedPosts = cachedPosts.map((post) => {
						if (post.id === postId) {
							return {
								...post,
								// toggle current like status
								liked: !post.liked,
								// change like count accordingly
								likes: post.liked ? post.likes - 1 : post.likes + 1,
							};
						} else return post;
					});
					proxy.writeQuery({
						query: GET_POSTS_QUERY,
						variables: { groupId: parseInt(groupId) },
						data: {
							getPosts: updatedPosts,
						},
					});
				} else {
					const data = proxy.readQuery({
						query: GET_POST_QUERY,
						variables: { postId },
					});
					const post = data.getPost;
					const updatedPost = {
						...post,
						// toggle current like status
						liked: !post.liked,
						// change like count accordingly
						likes: post.liked ? post.likes - 1 : post.likes + 1,
					};

					proxy.writeQuery({
						query: GET_POST_QUERY,
						variables: { postId },
						data: {
							getPost: updatedPost,
						},
					});
				}
			},
		});
	};
	return (
		<Feed.Event>
			<Feed.Label image={dp} />
			<Feed.Content>
				<Feed.Summary>
					<Link to={`/profile/${userId}`}> {username} </Link>
					<Feed.Date style={{ fontSize: ".75em" }}>
						{getRelativeTime(createdAt)}
					</Feed.Date>
				</Feed.Summary>
				{/* add this to treak style line breaks properly*/}
				<Feed.Extra style={{ whiteSpace: "pre-wrap" }} text>
					<ReactMarkdown source={content} />
				</Feed.Extra>
				<Feed.Meta>
					<Feed.Like
						onClick={() => handleLiked(id)}
						style={{ fontSize: ".75em" }}
					>
						<Icon
							color="blue"
							name={liked ? "thumbs up" : "thumbs up outline"}
						/>
						{likes} Likes
					</Feed.Like>
					<CommentListWrapper postId={id} />
				</Feed.Meta>
			</Feed.Content>
		</Feed.Event>
	);
};
export default PostItem;

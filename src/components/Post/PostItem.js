import React from "react";
import { Icon, Feed } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import hdate from "human-date";
import { GET_POSTS_QUERY, TOGGLE_LIKE_MUTATION } from "../../graphql/Post";
import { useMutation } from "@apollo/client";
import PostComments from "./containers/PostComments";
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
						{hdate.relativeTime(createdAt)}
					</Feed.Date>
				</Feed.Summary>
				{/* add this to treak style line breaks properly*/}
				<Feed.Extra style={{ whiteSpace: "pre-wrap" }} text>
					{content}
				</Feed.Extra>
				<Feed.Meta>
					<Feed.Like
						onClick={() => handleLiked(id)}
						style={{ fontSize: ".75em" }}
					>
						<Icon name={liked ? "thumbs up" : "thumbs up outline"} />
						{likes} Likes
					</Feed.Like>

					<PostComments postId={id} />
				</Feed.Meta>
			</Feed.Content>
		</Feed.Event>
	);
};
export default PostItem;

import React from "react";
import { Icon, Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { TOGGLE_LIKE_MUTATION } from "../../graphql/Post";
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
	const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION);
	const handleLiked = async (postId) => {
		toggleLike({
			variables: { postId },
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

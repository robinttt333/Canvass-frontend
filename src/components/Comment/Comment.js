import { Link } from "react-router-dom";
import React from "react";
import { Icon, Comment as SemanticComment } from "semantic-ui-react";
import { getRelativeTime } from "../../util";

const Comment = ({
	setInitialContent,
	focusInputCallback,
	comment: {
		content,
		createdAt,
		author: {
			id,
			username,
			profile: { dp },
		},
	},
}) => (
	<SemanticComment>
		<SemanticComment.Avatar src={dp} />
		<SemanticComment.Content>
			<SemanticComment.Author style={{ display: "inline" }}>
				<Link to={`/profile/${id}`}>{username}</Link>
			</SemanticComment.Author>
			<SemanticComment.Metadata>
				<div> {getRelativeTime(createdAt)} </div>
			</SemanticComment.Metadata>
			<SemanticComment.Text>
				{content}
				<Icon
					name="reply"
					style={{ marginLeft: "10px", color: "gray" }}
					link
					onClick={() => {
						focusInputCallback();
						setInitialContent(`@${username} `);
					}}
				/>
			</SemanticComment.Text>
		</SemanticComment.Content>
	</SemanticComment>
);
export default Comment;

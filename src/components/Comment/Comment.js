import hdate from "human-date";
import React from "react";
import { Comment as SemanticComment } from "semantic-ui-react";

const Comment = ({
	comment: {
		content,
		createdAt,
		author: {
			username,
			profile: { dp },
		},
	},
}) => (
	<SemanticComment>
		<SemanticComment.Avatar src={dp} />
		<SemanticComment.Content>
			<SemanticComment.Author as="a">{username}</SemanticComment.Author>
			<SemanticComment.Metadata>
				<div> {hdate.relativeTime(createdAt)} </div>
			</SemanticComment.Metadata>
			<SemanticComment.Text>{content}</SemanticComment.Text>
		</SemanticComment.Content>
	</SemanticComment>
);
export default Comment;

import React from "react";
import { Icon, Accordion } from "semantic-ui-react";

const CommentTitle = ({ count, showComments, toggleShowComments }) => (
	<Accordion.Title
		active={showComments}
		style={{ color: "#00000080", display: "inline-block" }}
		onClick={toggleShowComments}
	>
		<Icon name="dropdown" />
		<span style={{ fontSize: ".9em" }}>Comments({count})</span>{" "}
	</Accordion.Title>
);

export default CommentTitle;

import React from "react";
import { Header, Label, Icon } from "semantic-ui-react";
import PlainSegment from "../PlainSegment";
const colors = ["red", "blue", "green", "orange", "grey"];

const GroupTags = ({ tags }) => {
	return (
		<PlainSegment
			style={{
				height: "100%",
				overflowY: "auto",
				background: "#e6f1f5",
			}}
		>
			<Header>
				<Icon name="tags" size="mini" />
				Group Tags
			</Header>
			{tags.map(({ value, id }, index) => (
				<Label
					tag
					key={id}
					as="a"
					color={colors[index]}
					style={{ margin: "5px" }}
				>
					{value}
				</Label>
			))}
		</PlainSegment>
	);
};
export default GroupTags;

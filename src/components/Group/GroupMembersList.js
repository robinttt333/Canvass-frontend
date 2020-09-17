import React from "react";
import { Button, Image, List, Header } from "semantic-ui-react";
import PlainSegment from "../PlainSegment";

const GroupMembersList = ({ members }) => (
	<PlainSegment
		style={{
			background: "#e6f1f5",
			height: "100%",
		}}
	>
		<Header>Group Members</Header>
		<List divided verticalAlign="middle">
			{members.map(({ profile: { dp }, username }) => (
				<List.Item key={username}>
					<List.Content floated="right">
						<Button primary>Add</Button>
					</List.Content>
					<Image avatar src={dp} />
					<List.Content>{username}</List.Content>
				</List.Item>
			))}
		</List>
	</PlainSegment>
);
export default GroupMembersList;

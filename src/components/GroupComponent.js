import styled from "styled-components";
import React from "react";
import { Button, Form, Segment, Header } from "semantic-ui-react";
import GroupDescription from "../components/GroupDescription";

const GroupWrapper = styled.div`
	grid-column-start: 2;
	height: 100%;
	background: #e6f1f5;
`;

const Group = ({
	image,
	admin,
	visible,
	createdAt,
	description,
	members,
	name,
}) => {
	return (
		<GroupWrapper>
			<GroupDescription
				image={image}
				name={name}
				admin={admin}
				createdAt={createdAt}
				members={members}
				description={description}
				visible={visible}
			/>
			<Segment>
				<Header>Want to share something ? </Header>
				<Form reply>
					<Form.TextArea rows="8" />
					<Button content="Post" labelPosition="left" icon="edit" primary />
				</Form>
			</Segment>
		</GroupWrapper>
	);
};

export default Group;

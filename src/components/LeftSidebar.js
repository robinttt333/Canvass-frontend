import styled from "styled-components";
import React from "react";
import { Menu, Label, Header, List, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import PlainSegment from "./PlainSegment";
import { GET_USER_GROUPS } from "../graphql/Group";
import { useHistory } from "react-router-dom";

const LeftSidebarWrapper = styled.div`
	background: #e6f1f5;
	position: fixed;
	height: 100%;
	width: 25%;
	z-index: 1;
`;
const LeftSidebar = ({ name }) => {
	const history = useHistory();
	const { loading, data } = useQuery(GET_USER_GROUPS);
	if (loading) return null;
	const groups = data.getUserGroups;
	const activeItem = name;
	return (
		<LeftSidebarWrapper>
			<PlainSegment style={{ background: "#e6f1f5" }}>
				<Header>My Groups</Header>
				<Menu vertical secondary style={{ width: "100%" }}>
					{groups.map(({ name, id }) => (
						<Menu.Item
							key={name}
							name={name}
							active={activeItem === name}
							onClick={() => history.push(`/group/${id}`)}
						>
							<Label color="teal">1</Label>
							{name}
						</Menu.Item>
					))}
				</Menu>
			</PlainSegment>
		</LeftSidebarWrapper>
	);
};
export default LeftSidebar;

import styled from "styled-components";
import React from "react";
import { Header, List, Icon, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import PlainSegment from "./PlainSegment";
import { GET_USER_GROUPS } from "../graphql/Group";
import { Link } from "react-router-dom";

const LeftSidebarWrapper = styled.div`
	background: #e6f1f5;
	position: fixed;
	height: 100%;
	width: 25%;
	z-index: 1;
`;
const LeftSidebar = () => {
	const { loading, data } = useQuery(GET_USER_GROUPS);
	if (loading) return null;
	const groups = data.getUserGroups;
	return (
		<LeftSidebarWrapper>
			<PlainSegment style={{ background: "#e6f1f5" }}>
				<Header>My Groups</Header>
				<List divided>
					{groups.map(({ name, image, id, members }) => (
						<List.Item key={id}>
							<Image avatar src={image} />
							<List.Content>
								<Link to={`/group/${id}`}>
									<List.Header>{name}</List.Header>
									<List.Description>
										{members} {"  "} members
									</List.Description>
								</Link>
							</List.Content>
						</List.Item>
					))}
				</List>
			</PlainSegment>
		</LeftSidebarWrapper>
	);
};
export default LeftSidebar;

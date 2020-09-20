import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { Menu, Image, Dimmer, Loader } from "semantic-ui-react";
import React from "react";
import { GET_CHAT_MEMBERS } from "../../graphql/Message";
import { Link } from "react-router-dom";

const LeftSidebarWrapper = styled.div`
	background: #e6f1f5;
	height: 100%;
	position: fixed;
	width: 15%;
	grid-column: 1 / span 1;
`;

const LeftSidebar = ({ userId }) => {
	const { loading, data } = useQuery(GET_CHAT_MEMBERS);
	if (loading)
		return (
			<Dimmer inverted active>
				<Loader>Loading</Loader>
			</Dimmer>
		);

	const chatMembers = data.getChatMembers;
	const activeItem = userId;
	return (
		<LeftSidebarWrapper>
			<Menu fluid tabular vertical size="large">
				{chatMembers.map(({ id, username, profile: { dp } }) => (
					<Link to={`/chat/${id}`} key={id}>
						<Menu.Item active={activeItem === id}>
							<Image src={dp} avatar style={{ marginRight: "10px" }} />
							{username}
						</Menu.Item>
					</Link>
				))}
			</Menu>
		</LeftSidebarWrapper>
	);
};
export default LeftSidebar;

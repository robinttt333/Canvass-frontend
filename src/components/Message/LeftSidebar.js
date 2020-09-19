import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { List, Image, Dimmer, Loader } from "semantic-ui-react";
import React from "react";
import { GET_CHAT_MEMBERS } from "../../graphql/Message";
import { Link } from "react-router-dom";

const LeftSidebarWrapper = styled.div`
	background: #e6f1f5;
	height: 100%;
	position: fixed;
	width: 15%;
`;

const LeftSidebar = () => {
	const { loading, data } = useQuery(GET_CHAT_MEMBERS);

	if (loading)
		return (
			<Dimmer inverted active>
				<Loader>Loading</Loader>
			</Dimmer>
		);

	const chatMembers = data.getChatMembers;
	return (
		<LeftSidebarWrapper>
			<List divided animated verticalAlign="middle" style={{ padding: "10px" }}>
				{chatMembers.map(({ id, username, profile: { dp } }) => (
					<List.Item key={id}>
						<Image avatar src={dp} />
						<List.Content>
							{" "}
							<Link to={`/chat/${id}`} style={{ display: "inline-block" }}>
								{" "}
								{username}
							</Link>
						</List.Content>
					</List.Item>
				))}
			</List>
		</LeftSidebarWrapper>
	);
};
export default LeftSidebar;

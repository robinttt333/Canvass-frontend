import styled from "styled-components";
import React from "react";
import LeftSidebar from "../components/Message/LeftSidebar";
import CurrentChat from "../containers/Message/CurrentChat";
import { useParams } from "react-router-dom";
import { GET_USER } from "../graphql/User";
import { useQuery } from "@apollo/client";

const ChatWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 15% 85%;
	grid-template-rows: 91% 9%;
	overflow: hidden;
`;

const Chat = () => {
	const { userId } = useParams();
	const { loading, data } = useQuery(GET_USER, {
		variables: { userId: parseInt(userId) },
	});
	if (loading) return null;
	const user = data.getUser;
	return (
		<ChatWrapper>
			<LeftSidebar user={user} />
			<CurrentChat user={user} />
		</ChatWrapper>
	);
};
export default Chat;

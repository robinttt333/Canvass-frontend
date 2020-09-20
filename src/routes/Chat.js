import styled from "styled-components";
import React from "react";
import LeftSidebar from "../components/Message/LeftSidebar";
import CurrentChat from "../containers/Message/CurrentChat";
import { useParams } from "react-router-dom";

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
	return (
		<ChatWrapper>
			<LeftSidebar userId={parseInt(userId)} />
			<CurrentChat userId={parseInt(userId)} />
		</ChatWrapper>
	);
};
export default Chat;

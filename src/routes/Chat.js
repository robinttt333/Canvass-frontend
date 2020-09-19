import styled from "styled-components";
import React from "react";
import LeftSidebar from "../components/Message/LeftSidebar";

const ChatWrapper = styled.div`
	height: 100%;
	width: 100%;
`;

const CurrentChat = styled.div`
	height: 100%;
`;

const Chat = ({ userId }) => {
	return (
		<ChatWrapper>
			<LeftSidebar />
			<CurrentChat userId={userId} />
		</ChatWrapper>
	);
};
export default Chat;

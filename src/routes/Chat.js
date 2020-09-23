import styled from "styled-components";
import React from "react";
import LeftSidebar from "../components/Message/LeftSidebar";
import CurrentChat from "../containers/Message/CurrentChat";
import { Redirect, useParams } from "react-router-dom";
import { GET_USER } from "../graphql/User";
import { useQuery } from "@apollo/client";
import { getUserfromCookie } from "../util";

const ChatWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 15% 85%;
	grid-template-rows: 91% 9%;
	overflow: hidden;
`;

const Chat = () => {
	const params = useParams();
	const userId = params.userId ? params.userId : -1;
	const me = getUserfromCookie().userId;
	const { loading, data } = useQuery(GET_USER, {
		variables: { userId: parseInt(userId) },
	});

	if (me === parseInt(userId)) return <Redirect to={`/profile/${me}`} />;
	if (loading) return null;
	const user = data && data.getUser;
	//userId is valid number but no such user exists
	if (userId !== -1 && !user) {
		return <Redirect to="/group/1" />;
	}
	return (
		<ChatWrapper>
			<LeftSidebar user={user} />
			<CurrentChat user={user} />
		</ChatWrapper>
	);
};
export default Chat;

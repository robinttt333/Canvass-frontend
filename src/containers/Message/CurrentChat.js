import React from "react";
import { Header } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_CHAT } from "../../graphql/Message";
import MessageList from "../../components/Message/MessageList";
import NewMessage from "./NewMessage";
import { NEW_MESSAGE_SUBSCRIPTION } from "../../graphql/Message";
import styled from "styled-components";

const CurrentChatWrapper = styled.div`
	height: 100%;
	width: 100%;
	grid-column: 2 / span 1;
	overflow: hidden;
`;

const CurrentChat = ({ user }) => {
	const userId = user && user.id ? user.id : -1;
	const username = user && user.username;
	const { subscribeToMore, loading, data } = useQuery(GET_CHAT, {
		variables: {
			userId,
		},
		fetchPolicy: "network-only",
	});
	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: NEW_MESSAGE_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				return {
					getChat: [...prev.getChat, subscriptionData.data.messageAdded],
				};
			},
		});
		return () => unsubscribe();
		//eslint-disable-next-line
	}, [userId]);
	if (loading) return null;
	const messages = data && data.getChat ? data.getChat : [];

	return (
		<CurrentChatWrapper>
			{user && messages.length ? (
				<MessageList userId={userId} messages={messages} />
			) : null}
			{user && messages.length === 0 ? (
				<Header
					style={{
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					Start a conversation with {username}
				</Header>
			) : null}
			{!user ? (
				<Header
					style={{
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					Select a user to continue your conversation
				</Header>
			) : null}
			{user ? <NewMessage receiver={userId} /> : null}
		</CurrentChatWrapper>
	);
};
export default CurrentChat;

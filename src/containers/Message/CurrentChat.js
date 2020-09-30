import React from "react";
import { Header } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_CHAT } from "../../graphql/Message";
import MessageList from "../../components/Message/MessageList";
import NewMessage from "./NewMessage";
import { NEW_MESSAGE_SUBSCRIPTION } from "../../graphql/Message";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
const HeaderWrapper = styled.div`
	grid-column: 2 / span 1;
	grid-row: 1 / span 1;
	margin-top: 10px;
	margin-left: 10px;
	margin-right: 0;
	overflow: auto;
`;

const CurrentChat = ({ user }) => {
	const userId = user && user.id ? user.id : -1;
	const username = user && user.username;
	//check if userId is invalid
	const { subscribeToMore, loading, data, fetchMore } = useQuery(GET_CHAT, {
		variables: {
			userId,
			offset: 0,
		},
		fetchPolicy: "network-only",
	});

	const [hasMore, setHasMore] = React.useState(true);
	const handleMore = () => {
		fetchMore({
			variables: {
				offset: data.getChat.length,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (
					!fetchMoreResult ||
					!fetchMoreResult.getChat ||
					!fetchMoreResult.getChat.length ||
					!handleMore
				) {
					setHasMore(false);
					return prev;
				}
				return {
					getChat: [...fetchMoreResult.getChat, ...prev.getChat],
				};
			},
		});
	};

	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: NEW_MESSAGE_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				return {
					getChat: [subscriptionData.data.messageAdded, ...prev.getChat],
				};
			},
		});
		return () => unsubscribe();
		//eslint-disable-next-line
	}, [userId]);
	if (userId !== -1 && !username) {
		return <Redirect to="/group/1" />;
	}
	if (loading) return null;
	const messages = data && data.getChat ? data.getChat : [];

	return (
		<React.Fragment>
			{user && messages.length ? (
				<MessageList
					hasMore={hasMore}
					handleMore={handleMore}
					messages={messages}
				/>
			) : null}
			{user && messages.length === 0 ? (
				<HeaderWrapper>
					<Header
						style={{
							textAlign: "center",
						}}
					>
						Start a conversation with {username}
					</Header>
				</HeaderWrapper>
			) : null}
			{!user ? (
				<HeaderWrapper>
					<Header
						style={{
							textAlign: "center",
						}}
					>
						Select a user to continue your conversation
					</Header>
				</HeaderWrapper>
			) : null}
			{user ? <NewMessage receiver={userId} /> : null}
		</React.Fragment>
	);
};
export default CurrentChat;

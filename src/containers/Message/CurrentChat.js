import React from "react";
import { Header } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_CHAT } from "../../graphql/Message";
import MessageList from "../../components/Message/MessageList";
import NewMessage from "./NewMessage";
import { NEW_MESSAGE_SUBSCRIPTION } from "../../graphql/Message";

const CurrentChat = ({ user: { id: userId, username } }) => {
	const { subscribeToMore, loading, data } = useQuery(GET_CHAT, {
		variables: {
			userId,
		},
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

	const messages = data.getChat;
	return (
		<React.Fragment>
			{messages.length && <MessageList userId={userId} messages={messages} />}
			{messages.length === 0 && (
				<Header style={{ textAlign: "center" }}>
					Start a conversation with {username}
				</Header>
			)}
			<NewMessage receiver={userId} />
		</React.Fragment>
	);
};
export default CurrentChat;

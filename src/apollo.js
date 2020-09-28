import { createUploadLink } from "apollo-upload-client";
import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getCookies } from "./util";

export const wsLink = new WebSocketLink({
	uri: `ws://127.0.0.1:4000/graphql`,
	options: {
		reconnect: true,
		//pass a functions to ensure that latest values are read
		//otherwise connectionParams will be assigned stale value of cookie
		connectionParams: () => getCookies(),
	},
});
const httpLink = createUploadLink({
	uri: "http://127.0.0.1:4000/graphql",
	credentials: "include",
});
const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink
);
export const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				getUnreadGroupInviteNotifications: {
					merge(_, incoming) {
						return [...incoming];
					},
				},
				getNonGroupAndUninvitedMembers: {
					merge(_, incoming) {
						return [...incoming];
					},
				},
				getGroupInvites: {
					merge(_, incoming) {
						return [...incoming];
					},
				},
				getUnreadNotifications: {
					merge(_, incoming) {
						return [...incoming];
					},
				},
				getUnreadFriendRequestNotifications: {
					merge(_, incoming) {
						return [...incoming];
					},
				},
				getChat: {
					merge(_, incoming) {
						return [...incoming];
					},
				},
				getChatMembers: {
					merge(_, incoming) {
						return [...incoming];
					},
				},
			},
		},
	},
});

//define a custom merge function for updating cache
const client = new ApolloClient({
	link: splitLink,
	cache,
});

export default client;

import {
	ApolloClient,
	InMemoryCache,
	split,
	createHttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getCookies } from "./util";

const wsLink = new WebSocketLink({
	uri: `ws://127.0.0.1:4000/graphql`,
	options: {
		reconnect: true,
		connectionParams: getCookies(),
	},
});

const httpLink = createHttpLink({
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
const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});

export default client;

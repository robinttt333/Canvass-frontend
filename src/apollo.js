import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
	uri: "http://127.0.0.1:4000/graphql",
	credentials: "include",
});

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});

export default client;

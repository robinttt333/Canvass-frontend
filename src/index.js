import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Register from "./routes/Register";
import Login from "./routes/Login";
import client from "./apollo";
import { ApolloProvider } from "@apollo/client";
import Profile from "./routes/Profile";

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<Route path="/register" exact>
				<Register />
			</Route>
			<Route path="/login" exact>
				<Login />
			</Route>
			<Route path="/profile/:userId" exact>
				<Profile />
			</Route>
		</Router>
	</ApolloProvider>,
	document.getElementById("root")
);

serviceWorker.unregister();

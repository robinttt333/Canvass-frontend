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
import PrivateRoute from "./routes/PrivateRoute";
import Group from "./routes/Group";
import Chat from "./routes/Chat";

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<Route path="/register" exact component={Register} />
			<Route path="/login" exact component={Login} />
			<PrivateRoute path="/profile/:userId" exact component={Profile} />
			<PrivateRoute path="/group/:groupId" exact component={Group} />
			<PrivateRoute path="/chat/:userId" exact component={Chat} />
		</Router>
	</ApolloProvider>,
	document.getElementById("root")
);

serviceWorker.unregister();

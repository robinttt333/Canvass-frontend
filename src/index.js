import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
			<Switch>
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<PrivateRoute path="/profile/:userId" component={Profile} />
				<PrivateRoute path="/group/:groupId" component={Group} />
				<PrivateRoute path="/chat/:userId" component={Chat} />
			</Switch>
		</Router>
	</ApolloProvider>,
	document.getElementById("root")
);

serviceWorker.unregister();

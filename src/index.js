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
import Settings from "./routes/Settings";
import Logout from "./routes/Logout";
import Notification from "./routes/Notification";
import NewGroup from "./routes/NewGroup";
import Post from "./routes/Post";
import NotFound from "./routes/NotFound";

// Switch added to redirect from login page
ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<Switch>
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} />
				<PrivateRoute path="/profile/:userId" component={Profile} />
				<PrivateRoute path="/settings/:userId" component={Settings} />
				<PrivateRoute path="/group/new/" component={NewGroup} />
				<PrivateRoute path="/group/:groupId" component={Group} />
				<PrivateRoute path="/chat/:userId?" component={Chat} />
				<PrivateRoute path="/notifications/" component={Notification} />
				<PrivateRoute path="/post/:postId" component={Post} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	</ApolloProvider>,
	document.getElementById("root")
);

serviceWorker.unregister();

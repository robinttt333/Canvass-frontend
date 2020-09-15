import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Register from "./routes/Register";
import Login from "./routes/Login";

ReactDOM.render(
	<Router>
		<Route path="/register" exact>
			<Register />
		</Route>
		<Route path="/login" exact>
			<Login />
		</Route>
	</Router>,
	document.getElementById("root")
);

serviceWorker.unregister();

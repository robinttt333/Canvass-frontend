import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getUserfromCookie } from "../util";
import Navbar from "../components/Navbar";

// render all private routes with navbar
const PrivateRoute = ({ component: Component, ...rest }) => {
	const user = getUserfromCookie();
	return (
		<Route
			{...rest}
			render={(props) =>
				user && user.userId ? (
					<React.Fragment>
						<Navbar />
						<Component {...props} />
					</React.Fragment>
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};
export default PrivateRoute;

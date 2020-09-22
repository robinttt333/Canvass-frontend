import { Redirect } from "react-router-dom";
import { resetCookies } from "../util";
import React from "react";
import client from "../apollo";
import { wsLink } from "../apollo";

const Logout = () => {
	resetCookies();
	client.clearStore();
	wsLink.subscriptionClient.close(true);
	return <Redirect to="/login" />;
};

export default Logout;

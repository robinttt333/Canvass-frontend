import { decode } from "jsonwebtoken";
import Cookies from "js-cookie";

export const getUserfromCookie = () => {
	let accessToken;
	try {
		accessToken = Cookies.get("access-token");
	} catch (err) {
		return null;
	}
	const user = decode(accessToken);
	return user;
};

export const logoutUser = async () => {
	try {
		Cookies.remove("access-token", { path: "/" });
		Cookies.remove("refresh-token", { path: "/" });
	} catch (err) {
		console.log(err);
		return false;
	}
	return true;
};

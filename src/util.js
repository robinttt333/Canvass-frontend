import hdate from "human-date";
import { decode } from "jsonwebtoken";
import Cookies from "js-cookie";

export const resetCookies = () => {
	try {
		Cookies.remove("access-token", { path: "/" });
		Cookies.remove("refresh-token", { path: "/" });
	} catch (err) {
		return false;
	}
	return true;
};

export const getCookies = () => {
	let accessToken, refreshToken;
	try {
		accessToken = Cookies.get("access-token");
		refreshToken = Cookies.get("refresh-token");
	} catch (err) {
		return { accessToken: null, refreshToken: null };
	}
	return { accessToken, refreshToken };
};

export const getUserfromCookie = () => {
	const { accessToken } = getCookies();
	let user = null;
	try {
		user = decode(accessToken);
	} catch (err) {
		console.log(err);
	}
	return user;
};

export const getRelativeTime = (time) => {
	const t = hdate.relativeTime(time);
	if (t === " ago") return "just now";
	return t;
};

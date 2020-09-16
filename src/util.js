import { Cookies } from "react-cookie";
import { decode } from "jsonwebtoken";

export const getUserfromCookie = () => {
	const cookies = new Cookies();
	let accessToken;
	try {
		accessToken = cookies.get("refresh-token");
	} catch (err) {
		return null;
	}
	const user = decode(accessToken);
	return user;
};

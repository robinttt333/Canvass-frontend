import React from "react";
import { Menu } from "semantic-ui-react";
import { logoutUser } from "../util";
import { useHistory, useParams } from "react-router-dom";
import { getUserfromCookie } from "../util";

const Navbar = () => {
	const handleLogout = async (e) => {
		const res = logoutUser();
		if (res) return history.push("/login");
	};

	const param = useParams();
	const handleItemClick = (_, { name }) => {
		setState({ activeItem: name });
		switch (name) {
			case "profile":
				history.push(`/profile/${getUserfromCookie().userId}`);
				break;
			case "group":
				history.push("/group/1");
				break;
			case "chat":
				history.push(`/chat/${param.userId}`);
				break;
		}
	};
	//select active item from url
	const history = useHistory();
	const location = history.location.pathname.split("/")[1];
	const [state, setState] = React.useState(location);
	const activeItem = state;

	return (
		<Menu
			fixed="top"
			inverted
			size="large"
			style={{ borderRadius: "0px", height: "50px" }}
		>
			<Menu.Item
				name="profile"
				active={activeItem === "profile"}
				onClick={handleItemClick}
			>
				My Profile
			</Menu.Item>

			<Menu.Item
				name="group"
				active={activeItem === "group"}
				onClick={handleItemClick}
			>
				My Groups
			</Menu.Item>

			<Menu.Item
				name="chat"
				active={activeItem === "chat"}
				onClick={handleItemClick}
			>
				Chats
			</Menu.Item>
			<Menu.Item
				position="right"
				name="logout"
				active={activeItem === "logout"}
				onClick={handleLogout}
			>
				Logout
			</Menu.Item>
		</Menu>
	);
};
export default Navbar;

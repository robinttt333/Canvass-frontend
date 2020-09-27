import React from "react";
import { Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { getUserfromCookie } from "../util";

import Notifications from "../containers/Navbar/Notifications";
import FriendRequests from "../containers/Navbar/FriendRequests";
import GroupInvites from "../containers/Navbar/GroupInvites";
import UnreadMessages from "../containers/Navbar/UnreadMessages";

const Navbar = () => {
	const history = useHistory();
	const location = history.location.pathname.split("/")[1];
	const [activeItem, setActiveItem] = React.useState(location);
	const userId = getUserfromCookie().userId;

	const handleItemClick = (_, { name }) => {
		setActiveItem(name);
		switch (name) {
			case "profile":
				history.push(`/profile/${userId}`);
				break;
			case "group":
				history.push("/group/1");
				break;
			case "settings":
				history.push(`/settings/${userId}`);
				break;
			case "chat":
				history.push("/chat/");
				break;
			case "logout":
				history.push("/logout");
				break;
			default:
		}
	};

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
				name="settings"
				active={activeItem === "settings"}
				onClick={handleItemClick}
			>
				Settings
			</Menu.Item>

			<Menu.Item
				name="groupInvite"
				position="right"
				active={activeItem === "groupInvite"}
			>
				<GroupInvites />
			</Menu.Item>
			<Menu.Item name="friendRequest" active={activeItem === "friendRequest"}>
				<FriendRequests />
			</Menu.Item>
			<Menu.Item active={activeItem === "notification"}>
				<Notifications />
			</Menu.Item>
			<Menu.Item
				name="chat"
				onClick={handleItemClick}
				active={activeItem === "chat"}
			>
				<UnreadMessages />
			</Menu.Item>
			<Menu.Item
				name="logout"
				active={activeItem === "logout"}
				onClick={handleItemClick}
			>
				Logout
			</Menu.Item>
		</Menu>
	);
};
export default Navbar;

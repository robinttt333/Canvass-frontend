import React from "react";
import { Label, Icon, Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { getUserfromCookie } from "../util";
import { useQuery } from "@apollo/client";
import { GET_UNREAD_MESSAGES_COUNT } from "../graphql/Message";

const Navbar = () => {
	const { loading, data } = useQuery(GET_UNREAD_MESSAGES_COUNT, {});
	//select active item from url
	const history = useHistory();
	const location = history.location.pathname.split("/")[1];
	const [state, setState] = React.useState(location);
	const activeItem = state;
	if (loading) return null;
	const unreadMessagesCount = data.getUnreadMessagesCount;

	const handleItemClick = (_, { name }) => {
		setState({ activeItem: name });
		switch (name) {
			case "profile":
				history.push(`/profile/${getUserfromCookie().userId}`);
				break;
			case "group":
				history.push("/group/1");
				break;
			case "settings":
				history.push(`/settings/${getUserfromCookie().userId}`);
				break;
			case "chat":
				history.push("/chat/");
				break;
			case "logout":
				history.push("/logout");
				break;
			default:
				history.push("/groups/1");
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
				position="right"
				name="notification"
				active={activeItem === "notification"}
				onClick={handleItemClick}
			>
				<Icon name="bell" />
			</Menu.Item>
			<Menu.Item
				name="chat"
				active={activeItem === "chat"}
				onClick={handleItemClick}
			>
				<Icon name="mail" />
				{unreadMessagesCount ? (
					<Label color="red" floating size="mini" style={{ top: ".1em" }}>
						{unreadMessagesCount}
					</Label>
				) : null}
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

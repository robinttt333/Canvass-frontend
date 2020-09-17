import React from "react";
import { Menu } from "semantic-ui-react";
import { logoutUser } from "../util";
import { useHistory } from "react-router-dom";

const Navbar = () => {
	const [state, setState] = React.useState({});
	const handleItemClick = (e, { name }) => setState({ activeItem: name });
	const history = useHistory();
	const handleLogout = async (e) => {
		const res = logoutUser();
		if (res) return history.push("/login");
	};
	const { activeItem } = state;

	return (
		<Menu
			fixed="top"
			inverted
			size="large"
			style={{ borderRadius: "0px", height: "50px" }}
		>
			<Menu.Item
				name="editorials"
				active={activeItem === "editorials"}
				onClick={handleItemClick}
			>
				Editorials
			</Menu.Item>

			<Menu.Item
				name="reviews"
				active={activeItem === "reviews"}
				onClick={handleItemClick}
			>
				Reviews
			</Menu.Item>

			<Menu.Item
				name="upcomingEvents"
				active={activeItem === "upcomingEvents"}
				onClick={handleItemClick}
			>
				Upcoming Events
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

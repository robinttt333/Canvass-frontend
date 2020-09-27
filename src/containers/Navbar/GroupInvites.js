import React from "react";
import { Header, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getUserfromCookie } from "../../util";

const GroupInvites = () => {
	return (
		<Dropdown
			floating
			direction="left"
			icon="group"
			className="icon"
			scrolling
			fluid
		>
			<Dropdown.Menu>
				<Dropdown.Header icon="group" content="Group Invites" />
				<Dropdown.Divider />
				<Dropdown.Item>
					<Header as="h5" style={{ textAlign: "center" }}>
						No new group Invites
					</Header>
				</Dropdown.Item>
				<Dropdown.Item style={{ textAlign: "center" }}>
					<b>
						<Link to={`/profile/${getUserfromCookie().userId}`}>Show all</Link>
					</b>
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};
export default GroupInvites;

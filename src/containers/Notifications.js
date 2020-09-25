import React from "react";
import { Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Notifications = ({ unreadNotifications }) => {
	return (
		<Dropdown floating direction="left" icon="bell" className="icon">
			<Dropdown.Menu>
				<Dropdown.Header icon="tags" content="Notifications" />
				<Dropdown.Divider />
				{unreadNotifications.map(
					({ target, sender, group, object, id, text, post }) => {
						return (
							<Dropdown.Item key={id}>
								<b>
									<Link to={`/profile/${sender.id}`}>
										<Image avatar src={sender.profile.dp} />
										{sender.username} {"  "}
									</Link>
								</b>
								<i>{text}</i>
								{"  "}
								{object === "post" || object === "comment" ? (
									<b>
										<Link to={`/post/${post.id}`}>{object}</Link>
									</b>
								) : null}
								{target === "group" ? (
									<React.Fragment>
										<i>
											{"  "}in group{"   "}
										</i>
										<b>
											<Link to={`/group/${group.id}`}>{group.name}</Link>
										</b>
									</React.Fragment>
								) : null}
							</Dropdown.Item>
						);
					}
				)}
			</Dropdown.Menu>
		</Dropdown>
	);
};
export default Notifications;

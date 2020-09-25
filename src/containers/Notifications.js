import React from "react";
import { Header, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { MARK_NOTIFICATIONS_AS_READ } from "../graphql/Notification";
import { useMutation } from "@apollo/client";
import client from "../apollo";

// importing GET_UNREAD_NOTIFICATIONS does not work
const query = gql`
	{
		getUnreadNotifications {
			id
			sender {
				id
				username
				profile {
					dp
				}
			}
			read
			verb
			text
			object
			target
			post {
				id
			}
			comment {
				id
			}
			group {
				id
				name
			}
		}
	}
`;

const Notifications = ({ unreadNotifications }) => {
	// on Open update the values in backend
	// on Close update the values in cache
	// Here values refers to the unread Notifications
	const [markNotificationsAsRead] = useMutation(MARK_NOTIFICATIONS_AS_READ);
	const handleOpen = async () => {
		markNotificationsAsRead();
	};

	const handleClose = async () => {
		client.writeQuery({
			query,
			data: {
				getUnreadNotifications: [],
			},
		});
	};

	return (
		<Dropdown
			floating
			direction="left"
			icon="bell"
			className="icon"
			onOpen={handleOpen}
			onClose={handleClose}
			scrolling
		>
			<Dropdown.Menu>
				<Dropdown.Header icon="tags" content="Notifications" />
				<Dropdown.Divider />
				{unreadNotifications.length === 0 ? (
					<Dropdown.Item>
						<Header as="h5" style={{ textAlign: "center" }}>
							Nothing here
						</Header>
					</Dropdown.Item>
				) : null}
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

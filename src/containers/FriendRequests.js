import React from "react";
import { Header, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { MARK_FRIEND_REQUEST_NOTIFICATIONS_AS_READ } from "../graphql/Notification";
import { useMutation } from "@apollo/client";
import client from "../apollo";

// importing GET_UNREAD_NOTIFICATIONS does not work
const query = gql`
	{
		getUnreadFriendRequestNotifications {
			id
			sender {
				id
				username
				profile {
					dp
				}
			}
			verb
			text
			object
		}
	}
`;

const FriendRequests = ({ unreadFriendRequestNotifications }) => {
	// on Open update the values in backend
	// on Close update the values in cache
	// Here values refers to the unread Notifications
	const [markUnreadFriendRequestNotificationsAsRead] = useMutation(
		MARK_FRIEND_REQUEST_NOTIFICATIONS_AS_READ
	);
	const handleOpen = async () => {
		markUnreadFriendRequestNotificationsAsRead();
	};

	const handleClose = async () => {
		client.writeQuery({
			query,
			data: {
				getUnreadFriendRequestNotifications: [],
			},
		});
	};

	return (
		<Dropdown
			floating
			direction="left"
			icon="user"
			className="icon"
			onOpen={handleOpen}
			onClose={handleClose}
			scrolling
			fluid
		>
			<Dropdown.Menu>
				<Dropdown.Header icon="tags" content="Notifications" />
				<Dropdown.Divider />
				{unreadFriendRequestNotifications.length === 0 ? (
					<Dropdown.Item>
						<Header as="h5" style={{ textAlign: "center" }}>
							Nothing here
						</Header>
					</Dropdown.Item>
				) : null}
				{unreadFriendRequestNotifications.map(
					({ sender, object, id, text }) => {
						return (
							<Dropdown.Item key={id} style={{ minWidth: "300px" }}>
								<b>
									<Link to={`/profile/${sender.id}`}>
										<Image avatar src={sender.profile.dp} />
										{sender.username} {"  "}
									</Link>
								</b>
								<i>{text}</i>
								{"  "}
								<b>
									<Link to={`/profile/${sender.id}`}>{object}</Link>
								</b>
							</Dropdown.Item>
						);
					}
				)}
			</Dropdown.Menu>
		</Dropdown>
	);
};
export default FriendRequests;

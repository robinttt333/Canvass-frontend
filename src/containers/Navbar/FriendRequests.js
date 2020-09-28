import React from "react";
import { Label, Header, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import {
	NEW_FRIEND_REQUEST_NOTIFICATION_SUBSCRIPTION,
	GET_UNREAD_FRIEND_REQUEST_NOTIFICATIONS,
	MARK_FRIEND_REQUEST_NOTIFICATIONS_AS_READ,
} from "../../graphql/Notification";
import { useQuery, useMutation } from "@apollo/client";
import client from "../../apollo";
import { getUserfromCookie } from "../../util";

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

const FriendRequests = () => {
	const { subscribeToMore, loading, data } = useQuery(
		GET_UNREAD_FRIEND_REQUEST_NOTIFICATIONS,
		{
			fetchPolicy: "network-only",
		}
	);

	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: NEW_FRIEND_REQUEST_NOTIFICATION_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				return {
					getUnreadFriendRequestNotifications: [
						subscriptionData.data.friendRequestNotificationAdded,
						...prev.getUnreadFriendRequestNotifications,
					],
				};
			},
		});
		return () => unsubscribe();
		//eslint-disable-next-line
	}, []);
	// on Open update the values in backend
	// on Close update the values in cache
	// Here values refers to the unread Notifications
	const [markNotificationAsRead] = useMutation(
		MARK_FRIEND_REQUEST_NOTIFICATIONS_AS_READ
	);
	const handleOpen = async () => {
		markNotificationAsRead();
	};

	const handleClose = async () => {
		client.writeQuery({
			query,
			data: {
				getUnreadFriendRequestNotifications: [],
			},
		});
	};
	if (loading) return null;
	const notifications = data.getUnreadFriendRequestNotifications;
	return (
		<React.Fragment>
			{notifications.length ? (
				<Label color="red" floating size="mini" style={{ top: ".1em" }}>
					{notifications.length}
				</Label>
			) : null}
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
					<Dropdown.Header icon="user" content="Friend Requests" />
					<Dropdown.Divider />
					{notifications.length === 0 ? (
						<Dropdown.Item>
							<Header as="h5" style={{ textAlign: "center" }}>
								No new friend requests
							</Header>
						</Dropdown.Item>
					) : null}
					{notifications.map(({ sender, object, id, text }) => {
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
					})}
					<Dropdown.Item style={{ textAlign: "center" }}>
						<b>
							<Link to={`/notifications`}>Show all</Link>
						</b>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</React.Fragment>
	);
};
export default FriendRequests;

import React from "react";
import { Label, Header, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import {
	NEW_NOTIFICATION_SUBSCRIPTION,
	GET_UNREAD_NOTIFICATIONS,
	DELETE_NOTIFICATION_SUBSCRIPTION,
	MARK_NOTIFICATIONS_AS_READ,
} from "../../graphql/Notification";
import { useQuery, useMutation } from "@apollo/client";
import client from "../../apollo";
import { getUserfromCookie } from "../../util";

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

const Notifications = () => {
	const { subscribeToMore, loading, data } = useQuery(
		GET_UNREAD_NOTIFICATIONS,
		{
			fetchPolicy: "network-only",
		}
	);

	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: NEW_NOTIFICATION_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				return {
					getUnreadNotifications: [
						subscriptionData.data.notificationAdded,
						...prev.getUnreadNotifications,
					],
				};
			},
		});
		return () => unsubscribe();
		//eslint-disable-next-line
	}, []);

	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: DELETE_NOTIFICATION_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				const id = subscriptionData.data.notificationDeleted.id;
				const notifications = prev.getUnreadNotifications;
				const newNotifications = notifications.filter(
					(notification) => notification.id !== id
				);
				return {
					getUnreadNotifications: newNotifications,
				};
			},
		});
		return () => unsubscribe();
		//eslint-disable-next-line
	}, []);

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
	if (loading) return null;
	const notifications = data.getUnreadNotifications;
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
				icon="bell"
				className="icon"
				onOpen={handleOpen}
				onClose={handleClose}
				scrolling
			>
				<Dropdown.Menu>
					<Dropdown.Header icon="tags" content="Notifications" />
					<Dropdown.Divider />
					{notifications.length === 0 ? (
						<Dropdown.Item>
							<Header as="h5" style={{ textAlign: "center" }}>
								No new notifications
							</Header>
						</Dropdown.Item>
					) : null}
					{notifications.map(
						({ target, sender, group, object, id, text, post }) => {
							return (
								<Dropdown.Item key={id} style={{ minWidth: "400px" }}>
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
					<Dropdown.Item style={{ textAlign: "center" }}>
						<b>
							<Link to="/notifications">Show all</Link>
						</b>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</React.Fragment>
	);
};
export default Notifications;

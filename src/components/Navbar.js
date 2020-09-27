import React from "react";
import { Label, Icon, Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { getUserfromCookie } from "../util";
import { useQuery } from "@apollo/client";
import { GET_UNREAD_MESSAGES_COUNT } from "../graphql/Message";

import {
	NEW_NOTIFICATION_SUBSCRIPTION,
	GET_UNREAD_FRIEND_REQUEST_NOTIFICATIONS,
	NEW_FRIEND_REQUEST_NOTIFICATION_SUBSCRIPTION,
	GET_UNREAD_NOTIFICATIONS,
	DELETE_NOTIFICATION_SUBSCRIPTION,
} from "../graphql/Notification";

import Notifications from "../containers/Navbar/Notifications";
import FriendRequests from "../containers/Navbar/FriendRequests";
import GroupInvites from "../containers/Navbar/GroupInvites";

const Navbar = () => {
	const { loading, data } = useQuery(GET_UNREAD_MESSAGES_COUNT, {
		fetchPolicy: "network-only",
		//pollInterval: 500,
	});
	const history = useHistory();
	const location = history.location.pathname.split("/")[1];
	const [activeItem, setActiveItem] = React.useState(location);

	const {
		subscribeToMore: subscribeToMoreNotifications,
		loading: loadingNotifications,
		data: unreadNotificationsData,
	} = useQuery(GET_UNREAD_NOTIFICATIONS, {
		fetchPolicy: "network-only",
	});

	const {
		subscribeToMore: subscribeToMoreFriendRequestNotifications,
		loading: loadingFriendRequestNotifications,
		data: unreadFriendRequestNotificationsData,
	} = useQuery(GET_UNREAD_FRIEND_REQUEST_NOTIFICATIONS, {
		fetchPolicy: "network-only",
	});

	React.useEffect(() => {
		const unsubscribe = subscribeToMoreNotifications({
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
		const unsubscribe = subscribeToMoreFriendRequestNotifications({
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

	React.useEffect(() => {
		const unsubscribe = subscribeToMoreNotifications({
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

	if (loading || loadingNotifications || loadingFriendRequestNotifications)
		return null;

	const unreadNotifications = unreadNotificationsData.getUnreadNotifications;
	const unreadFriendRequestNotifications =
		unreadFriendRequestNotificationsData.getUnreadFriendRequestNotifications;
	const unreadMessagesCount = data.getUnreadMessagesCount;

	const handleItemClick = (_, { name }) => {
		setActiveItem(name);
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

			<Menu.Item position="right" active={activeItem === "notification"}>
				<GroupInvites />
			</Menu.Item>
			<Menu.Item active={activeItem === "notification"}>
				{unreadFriendRequestNotifications.length ? (
					<Label color="red" floating size="mini" style={{ top: ".1em" }}>
						{unreadFriendRequestNotifications.length}
					</Label>
				) : null}
				<FriendRequests
					unreadFriendRequestNotifications={unreadFriendRequestNotifications}
				/>
			</Menu.Item>
			<Menu.Item active={activeItem === "notification"}>
				{unreadNotifications.length ? (
					<Label color="red" floating size="mini" style={{ top: ".1em" }}>
						{unreadNotifications.length}
					</Label>
				) : null}
				<Notifications unreadNotifications={unreadNotifications} />
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

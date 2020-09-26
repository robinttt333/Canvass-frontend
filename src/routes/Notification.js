import React from "react";
import { Segment, Feed, Header, Image } from "semantic-ui-react";
import styled from "styled-components";
import { GET_ALL_NOTIFICATIONS } from "../graphql/Notification";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { getRelativeTime } from "../util";

const NotificationWrapper = styled.div`
	margin: 0 25%;
	height: 100%;
	padding: 10px;
`;

const Notification = () => {
	const { loading, data } = useQuery(GET_ALL_NOTIFICATIONS);
	if (loading) return null;
	const allNotifications = data.getAllNotifications;
	const friendRequestNotifications = allNotifications.filter(
		({ object }) => object === "friend request"
	);
	const notifications = allNotifications.filter(
		({ object }) => object !== "friend request"
	);

	return (
		<NotificationWrapper>
			<Segment>
				<Header>Notifications</Header>
				<Feed style={{ textAlign: "center" }}>
					{notifications.length === 0 ? (
						<b>No notifications to show at the moment</b>
					) : null}
					{notifications.map(
						({ id, sender, text, object, group, createdAt }) => (
							<Feed.Event key={id}>
								<Feed.Label>
									<Image avatar src={sender.profile.dp} />
								</Feed.Label>
								<Feed.Content>
									<Feed.Summary>
										<Feed.User>{sender.username}</Feed.User> {text} {"  "}{" "}
										{object} in group{"  "}{" "}
										<Link to={`/group/${group.id}`}>{group.name}</Link>
										<Feed.Date>{getRelativeTime(createdAt)}</Feed.Date>
									</Feed.Summary>
								</Feed.Content>
							</Feed.Event>
						)
					)}
				</Feed>
			</Segment>
			<Segment>
				<Header>Friend Request Notifications</Header>
				<Feed style={{ textAlign: "center" }}>
					{notifications.length === 0 ? (
						<b>No notifications to show at the moment</b>
					) : null}
					{friendRequestNotifications.map(
						({ id, sender, text, object, group, createdAt }) => (
							<Feed.Event key={id}>
								<Feed.Label>
									<Image avatar src={sender.profile.dp} />
								</Feed.Label>
								<Feed.Content>
									<Feed.Summary>
										<Feed.User>{sender.username}</Feed.User> {text} {"  "}{" "}
										{object}
										<Feed.Date>{getRelativeTime(createdAt)}</Feed.Date>
									</Feed.Summary>
								</Feed.Content>
							</Feed.Event>
						)
					)}
				</Feed>
			</Segment>
		</NotificationWrapper>
	);
};

export default Notification;

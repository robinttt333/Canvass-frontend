import React from "react";
import { Segment, Feed, Header, Image } from "semantic-ui-react";
import styled from "styled-components";
import { GET_ALL_NOTIFICATIONS } from "../graphql/Notification";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { getUserfromCookie, getRelativeTime } from "../util";
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
		({ object }) => object !== "friend request" && object !== "invitation"
	);

	const groupInvites = allNotifications.filter(
		({ object }) => object === "invitation"
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
						({ id, sender, text, object, createdAt }) => (
							<Feed.Event key={id}>
								<Feed.Label>
									<Image avatar src={sender.profile.dp} />
								</Feed.Label>
								<Feed.Content>
									<Feed.Summary>
										<Feed.User>
											<Link to={`/profile/${sender.id}`}>
												{sender.username}
											</Link>
										</Feed.User>{" "}
										{text} {"  "} {object}
										<Feed.Date>{getRelativeTime(createdAt)}</Feed.Date>
									</Feed.Summary>
								</Feed.Content>
							</Feed.Event>
						)
					)}
				</Feed>
			</Segment>
			<Segment>
				<Header>
					Group Invites (
					<Link
						to={`/profile/${getUserfromCookie().userId}`}
						style={{ fontSize: "small" }}
					>
						See active
					</Link>
					)
				</Header>
				<Feed style={{ textAlign: "center" }}>
					{groupInvites.length === 0 ? (
						<b>No group invites to show at the moment</b>
					) : null}
					{groupInvites.map(({ id, sender, group, createdAt }) => (
						<Feed.Event key={id}>
							<Feed.Label>
								<Image avatar src={sender.profile.dp} />
							</Feed.Label>
							<Feed.Content>
								<Feed.Summary>
									<Feed.User>{sender.username}</Feed.User> sent you an {"  "}
									<Link to={`/profile/${getUserfromCookie().userId}`}>
										invitation
									</Link>{" "}
									for group <Link to={`/group/${group.id}`}>{group.name}</Link>
									<Feed.Date>{getRelativeTime(createdAt)}</Feed.Date>
								</Feed.Summary>
							</Feed.Content>
						</Feed.Event>
					))}
				</Feed>
			</Segment>
		</NotificationWrapper>
	);
};

export default Notification;

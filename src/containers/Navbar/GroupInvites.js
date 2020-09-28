import React from "react";
import { Image, Label, Header, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getUserfromCookie } from "../../util";
import {
	GET_UNREAD_GROUP_INVITE_NOTIFICATIONS,
	NEW_GROUP_INVITE_SUBSCRIPTION,
	MARK_GROUP_INVITE_NOTIFICATIONS_AS_READ,
} from "../../graphql/Notification";
import { gql, useQuery, useMutation } from "@apollo/client";
import client from "../../apollo";
const query = gql`
	{
		getUnreadGroupInviteNotifications {
			id
			createdAt
			sender {
				id
				username
				profile {
					dp
					id
				}
			}
			verb
			text
			object
			target
			targetId
			group {
				id
				name
			}
		}
	}
`;
const GroupInvites = () => {
	const { subscribeToMore, loading, data } = useQuery(
		GET_UNREAD_GROUP_INVITE_NOTIFICATIONS,
		{
			fetchPolicy: "network-only",
		}
	);
	const [markGroupInviteNotificationAsRead] = useMutation(
		MARK_GROUP_INVITE_NOTIFICATIONS_AS_READ
	);
	const userId = getUserfromCookie().userId;
	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: NEW_GROUP_INVITE_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				console.log(prev, subscriptionData);
				return {
					getUnreadGroupInviteNotifications: [
						subscriptionData.data.groupInviteNotificationAdded,
						...prev.getUnreadGroupInviteNotifications,
					],
				};
			},
		});
		return () => unsubscribe();
		//eslint-disable-next-line
	}, []);

	const handleOpen = async () => {
		markGroupInviteNotificationAsRead();
	};

	const handleClose = async () => {
		client.writeQuery({
			query,
			data: {
				getUnreadGroupInviteNotifications: [],
			},
		});
	};

	if (loading) return null;
	const notifications = data.getUnreadGroupInviteNotifications;
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
				icon="group"
				className="icon"
				scrolling
				fluid
				onOpen={handleOpen}
				onClose={handleClose}
			>
				<Dropdown.Menu>
					<Dropdown.Header icon="group" content="Group Invites" />
					<Dropdown.Divider />
					{notifications.map(({ sender, object, id, text, group }) => {
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
								<b>
									<Link to={`/profile/${userId}`}>{object}</Link>
								</b>
								to join{"  "}
								<b>
									<Link to={`/group/${group.id}`}>{group.name}</Link>
								</b>
							</Dropdown.Item>
						);
					})}
					<Dropdown.Item>
						<Header as="h5" style={{ textAlign: "center" }}>
							No new group Invites
						</Header>
					</Dropdown.Item>
					<Dropdown.Item style={{ textAlign: "center" }}>
						<b>
							<Link to={`/profile/${userId}`}>Show all pending</Link>
						</b>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</React.Fragment>
	);
};
export default GroupInvites;

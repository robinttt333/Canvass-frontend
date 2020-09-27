import React from "react";
import { Label, Header, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getUserfromCookie } from "../../util";
import {
	GET_UNREAD_GROUP_INVITE_NOTIFICATIONS,
	NEW_GROUP_INVITE_SUBSCRIPTION,
} from "../../graphql/Notification";
import { useQuery } from "@apollo/client";

const GroupInvites = () => {
	const { subscribeToMore, loading, data } = useQuery(
		GET_UNREAD_GROUP_INVITE_NOTIFICATIONS,
		{
			fetchPolicy: "network-only",
		}
	);

	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: NEW_GROUP_INVITE_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
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
							<Link to={`/profile/${getUserfromCookie().userId}`}>
								Show all
							</Link>
						</b>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</React.Fragment>
	);
};
export default GroupInvites;

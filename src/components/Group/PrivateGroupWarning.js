import React from "react";
import {
	Segment,
	Button,
	Image,
	Feed,
	Grid,
	Icon,
	Message,
} from "semantic-ui-react";
import { ACCEPT_GROUP_INVITE, CANCEL_GROUP_INVITE } from "../../graphql/Group";
import { Link } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_GROUP_INVITE } from "../../graphql/Group";
import { getRelativeTime } from "../../util";
import client from "../../apollo";

const getGroupQuery = gql`
	query($groupId: Int!) {
		getGroup(groupId: $groupId) {
			id
			name
			me
			members
			description
			image
			admin {
				username
				id
			}
			createdAt
			public
		}
	}
`;

const getInviteQuery = gql`
	query($groupId: Int!) {
		getGroupInvite(groupId: $groupId) {
			id
			group {
				name
				id
			}
			sender {
				id
				username
				profile {
					dp
				}
			}
			createdAt
		}
	}
`;
const PrivateGroupWarning = ({ admin: { id, username }, groupId }) => {
	const { loading, data } = useQuery(GET_GROUP_INVITE, {
		variables: { groupId },
	});
	const [acceptGroupInvite] = useMutation(ACCEPT_GROUP_INVITE);
	const [cancelGroupInvite] = useMutation(CANCEL_GROUP_INVITE);

	const acceptGroupInviteHandler = async (id, sender, groupId) => {
		const {
			data: {
				acceptGroupInvite: { ok },
			},
		} = await acceptGroupInvite({ variables: { sender, groupId } });
		if (ok) {
			//write me as true ie update me to be a member of group in cache also
			//also delete the group invite
			client.writeQuery({
				query: getInviteQuery,
				variables: { groupId },
				data: {
					getGroupInvite: {},
				},
			});
			const data = client.readQuery({
				query: getGroupQuery,
				variables: { groupId },
			});
			client.writeQuery({
				query: getGroupQuery,
				variables: { groupId },
				data: {
					getGroup: {
						...data.getGroup,
						me: true,
					},
				},
			});
		}
	};
	const cancelGroupInviteHandler = async (id, sender, groupId) => {
		const {
			data: {
				cancelGroupInvite: { ok },
			},
		} = await cancelGroupInvite({ variables: { sender, groupId } });
		if (ok) {
			client.writeQuery({
				query: getInviteQuery,
				variables: { groupId },
				data: {
					getGroupInvite: {},
				},
			});
		}
	};
	if (loading) return null;
	if (!data || !data.getGroupInvite) {
		return (
			<Message negative style={{ margin: "10px" }}>
				<Message.Header>
					You are currently not a member
					<Icon name="warning" />
				</Message.Header>
				<Message.Content>
					You are currently not a member of this group and since this is a
					private group you can only join it if the admin:{"  "}
					<Link to={`/profile/${id}`}>{username}</Link> sends you an invite
				</Message.Content>
			</Message>
		);
	}
	const {
		id: groupInviteId,
		group: { name },
		createdAt,
		sender: {
			profile: { dp },
		},
	} = data && data.getGroupInvite;
	return (
		<React.Fragment>
			<Segment>
				<Feed>
					<Feed.Event>
						<Feed.Label>
							<Image avatar src={dp} />
						</Feed.Label>
						<Feed.Content>
							<Feed.Summary>
								<Grid>
									<Grid.Row columns={2}>
										<Grid.Column>
											<Link to={`/profile/${id}`}>{username}</Link> invited you
											to join <Link to={`/group/${groupId}`}>{name} </Link>
											<Feed.Date style={{ display: "inline" }}>
												{getRelativeTime(createdAt)}
											</Feed.Date>
										</Grid.Column>
										<Grid.Column style={{ textAlign: "right" }}>
											<Button
												color="green"
												size="mini"
												onClick={() =>
													acceptGroupInviteHandler(groupInviteId, id, groupId)
												}
											>
												Accept
											</Button>
											<Button
												color="red"
												size="mini"
												onClick={() =>
													cancelGroupInviteHandler(groupInviteId, id, groupId)
												}
											>
												Cancel
											</Button>
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Feed.Summary>
						</Feed.Content>
					</Feed.Event>
				</Feed>
			</Segment>
		</React.Fragment>
	);
};

export default PrivateGroupWarning;

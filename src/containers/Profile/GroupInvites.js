import React from "react";
import {
	Divider,
	Image,
	Grid,
	Button,
	Feed,
	Header,
	Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
	ACCEPT_GROUP_INVITE,
	CANCEL_GROUP_INVITE,
	GET_GROUP_INVITES,
} from "../../graphql/Group";
import { getRelativeTime } from "../../util";
import client from "../../apollo";

const query = gql`
	query {
		getGroupInvites {
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

const GroupInvites = () => {
	const { loading, data } = useQuery(GET_GROUP_INVITES, { pollInterval: 500 });
	const [acceptGroupInvite] = useMutation(ACCEPT_GROUP_INVITE);
	const [cancelGroupInvite] = useMutation(CANCEL_GROUP_INVITE);

	if (loading) return null;
	const groupInvites = data.getGroupInvites;

	const acceptGroupInviteHandler = async (id, sender, groupId) => {
		const {
			data: {
				acceptGroupInvite: { ok },
			},
		} = await acceptGroupInvite({ variables: { sender, groupId } });
		if (ok) {
			const invites = groupInvites.filter(
				({ id: inviteId }) => inviteId !== id
			);
			client.writeQuery({
				query,
				data: {
					getGroupInvites: invites,
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
			const invites = groupInvites.filter(
				({ id: inviteId }) => inviteId !== id
			);
			client.writeQuery({
				query,
				data: {
					getGroupInvites: invites,
				},
			});
		}
	};
	return (
		<React.Fragment>
			<Divider />
			<Header as="h3">
				<Icon name="group" style={{ display: "inline" }} />
				My Active Group Invites (
				<Link style={{ fontSize: "medium" }} to="/notifications">
					See all
				</Link>
				)
			</Header>
			<Feed>
				{!groupInvites.length ? (
					<Header as="h5" style={{ textAlign: "center" }}>
						No pending Invites
					</Header>
				) : null}
				{groupInvites.length
					? groupInvites.map(
							({
								id: groupInviteId,
								sender: {
									id,
									username,
									profile: { dp },
								},
								createdAt,
								group: { name, id: groupId },
							}) => (
								<Feed.Event key={groupInviteId}>
									<Feed.Label>
										<Image avatar src={dp} />
									</Feed.Label>
									<Feed.Content>
										<Feed.Summary>
											<Grid>
												<Grid.Row columns={2}>
													<Grid.Column>
														<Link to={`/profile/${id}`}>{username}</Link>{" "}
														invited you to join{" "}
														<Link to={`/group/${groupId}`}>{name} </Link>
														<Feed.Date style={{ display: "inline" }}>
															{getRelativeTime(createdAt)}
														</Feed.Date>
													</Grid.Column>
													<Grid.Column style={{ textAlign: "right" }}>
														<Button
															color="green"
															size="mini"
															onClick={() =>
																acceptGroupInviteHandler(
																	groupInviteId,
																	id,
																	groupId
																)
															}
														>
															Accept
														</Button>
														<Button
															color="red"
															size="mini"
															onClick={() =>
																cancelGroupInviteHandler(
																	groupInviteId,
																	id,
																	groupId
																)
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
							)
					  )
					: null}
			</Feed>
		</React.Fragment>
	);
};

export default GroupInvites;

import React from "react";
import { Grid, Header, Icon, Segment } from "semantic-ui-react";
import hdate from "human-date";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_FRIENDSHIP_STATUS } from "../../graphql/Friend";
import FriendshipStatus from "../Friend/FriendshipStatus";
import { getUserfromCookie } from "../../util";
import GroupInvites from "./GroupInvites";

export default ({ firstName, lastName, dob, gender, userId }) => {
	const history = useHistory();
	const { loading, data } = useQuery(GET_FRIENDSHIP_STATUS, {
		variables: { friendId: parseInt(userId) },
		fetchPolicy: "network-only",
		pollInterval: 500,
	});
	const me = getUserfromCookie().userId;
	if (loading) return null;
	const status = data.getFriendshipStatus.status;
	return (
		<Grid.Column width={12}>
			<Grid>
				<Grid.Row columns={2}>
					<Grid.Column>
						<Header as="h2">
							<Icon name="user circle" />
							<Header.Content>User Profile</Header.Content>
						</Header>
					</Grid.Column>
					<Grid.Column style={{ textAlign: "right" }}>
						{me === parseInt(userId) ? null : (
							<FriendshipStatus userId={parseInt(userId)} status={status} />
						)}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row columns={2}>
					<Grid.Column>
						<Segment>
							First Name: <h4>{firstName}</h4>
						</Segment>
					</Grid.Column>
					<Grid.Column>
						<Segment>
							Last Name: <h4>{lastName}</h4>
						</Segment>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row columns={2}>
					<Grid.Column>
						<Segment>
							Date of Birth: <h4>{hdate.prettyPrint(dob)}</h4>
						</Segment>
					</Grid.Column>
					<Grid.Column>
						<Segment>
							Gender: <h4>{gender ? "Male" : "Female"}</h4>
						</Segment>
					</Grid.Column>
				</Grid.Row>
				{me === parseInt(userId) ? (
					<React.Fragment>
						<Grid.Row>
							<Grid.Column>
								<Header as="h5">
									<Icon
										name="settings"
										link
										onClick={() => history.push(`/settings/${userId}`)}
									/>
									<Header.Content>
										<Link to={`/settings/${userId}`}>Manage Profile</Link>
									</Header.Content>
								</Header>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<GroupInvites />
							</Grid.Column>
						</Grid.Row>
					</React.Fragment>
				) : null}
			</Grid>
		</Grid.Column>
	);
};

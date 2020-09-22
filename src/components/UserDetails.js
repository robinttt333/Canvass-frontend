import React from "react";
import { Grid, Header, Icon, Segment } from "semantic-ui-react";
import hdate from "human-date";
import { useHistory } from "react-router-dom";

export default ({ firstName, lastName, dob, gender, userId }) => {
	const history = useHistory();
	return (
		<Grid.Column width={12}>
			<Grid>
				<Grid.Row centered>
					<Header as="h2" textAlign="center">
						<Icon name="user circle" />
						<Header.Content>User Profile</Header.Content>
					</Header>
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
				<Grid.Row>
					<Grid.Column>
						<Header as="h5">
							<Icon
								name="settings"
								link
								onClick={() => history.push(`/settings/${userId}`)}
							/>
							<Header.Content>Manage Profile</Header.Content>
						</Header>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Grid.Column>
	);
};

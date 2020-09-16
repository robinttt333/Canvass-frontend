import React from "react";
import { Grid, Header, Icon, Segment } from "semantic-ui-react";
import hdate from "human-date";

export default ({ firstName, lastName, dob, sex }) => (
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
						Sex: <h4>{sex ? "Male" : "Female"}</h4>
					</Segment>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column>
					<Header as="h5">
						<Icon name="settings" link onClick={() => console.log("clicked")} />
						<Header.Content>Manage Profile</Header.Content>
					</Header>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</Grid.Column>
);

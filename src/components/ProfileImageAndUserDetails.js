import React from "react";
import { Icon, Grid, Image, Card } from "semantic-ui-react";
import hdate from "human-date";

export default ({ username, dp, status, email, createdAt }) => (
	<Grid.Column width={4}>
		<Card>
			<Image src={`http://localhost:4000/files/${dp}`} wrapped ui={false} />
			<Card.Content>
				<Card.Header>{username}</Card.Header>
				<Card.Meta>
					<span className="date">Joined on {hdate.prettyPrint(createdAt)}</span>
				</Card.Meta>
				<Card.Description>{status}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Icon name="envelope" />
				{email}
			</Card.Content>
		</Card>
	</Grid.Column>
);

import React from "react";
import { Icon, Grid, Image, Card } from "semantic-ui-react";
import hdate from "human-date";
import { Link } from "react-router-dom";
import ShowFriendsModal from "./ShowFriendsModal";

export default ({
	userId,
	username,
	dp,
	status,
	email,
	createdAt,
	friends,
}) => {
	const [open, setOpen] = React.useState(false);
	return (
		<Grid.Column width={4}>
			<Card>
				<Image src={dp} wrapped ui={false} />
				<Card.Content>
					<Card.Header>{username}</Card.Header>
					<Card.Meta>
						<span className="date">
							Joined on {hdate.prettyPrint(createdAt)}
						</span>
					</Card.Meta>
					<Card.Description>{status}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Icon name="envelope" />
					{email}
					<br />
					<Link onClick={() => setOpen(true)} to="#">
						<Icon name="group" />
						{friends} {friends === 1 ? "friend" : "friends"}
					</Link>
				</Card.Content>
				<ShowFriendsModal
					userId={parseInt(userId)}
					username={username}
					open={open}
					setOpen={setOpen}
				/>
			</Card>
		</Grid.Column>
	);
};

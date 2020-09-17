import React from "react";
import hdate from "human-date";
import { Grid, Segment, Icon, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PlainSegment from "../PlainSegment";

const GroupDescription = ({
	image,
	name,
	createdAt,
	members,
	visible,
	admin,
	description,
}) => (
	<PlainSegment placeholder style={{ border: "none" }}>
		<Grid verticalAlign="middle">
			<Image src={image} />
			<Grid.Column width={4}>
				<Grid>
					<Grid.Row>
						<Grid.Column>
							<Card>
								<Card.Content>
									<Card.Header>#{name}</Card.Header>
									<Card.Meta>
										<span className="date">
											Created {hdate.relativeTime(createdAt)} by{" "}
											{admin ? <Link to="/profile/1">admin</Link> : "admin"}
										</span>
									</Card.Meta>
								</Card.Content>
								<Card.Content extra>
									<Icon name="user" />
									{members} {members === 1 ? "member" : "members"}
									<br />
									<Icon name={visible ? "check" : "close"} />
									Status: {visible ? "Public" : "Private"}
								</Card.Content>
							</Card>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Grid.Column>
			<Grid.Column width={12}>{description}</Grid.Column>
		</Grid>
	</PlainSegment>
);
export default GroupDescription;

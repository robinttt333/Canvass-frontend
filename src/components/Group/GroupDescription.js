import React from "react";
import hdate from "human-date";
import { Grid, Icon, Card, Image } from "semantic-ui-react";
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
	<PlainSegment placeholder style={{ border: "none", background: "white" }}>
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
											Created <b>{hdate.relativeTime(createdAt)}</b> by{" "}
											<b>
												{admin ? <Link to="/profile/1">admin</Link> : "admin"}
											</b>
										</span>
									</Card.Meta>
								</Card.Content>
								<Card.Content extra>
									<Icon name="user" color="black" />
									{members} {members === 1 ? "member" : "members"}
									<br />
									<Icon
										name={visible ? "check" : "close"}
										color={visible ? "green" : "red"}
									/>
									Status: <b>{visible ? "Public" : "Private"}</b>
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

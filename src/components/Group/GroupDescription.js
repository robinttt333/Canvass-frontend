import React from "react";
import hdate from "human-date";
import { Grid, Icon, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PlainSegment from "../PlainSegment";
import { getUserfromCookie } from "../../util";
import InviteMembersModal from "./InviteMembersModal";

const GroupDescription = ({
	id,
	image,
	name,
	createdAt,
	members,
	visible,
	admin,
	description,
}) => {
	const [open, setOpen] = React.useState(false);
	return (
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
													{id !== 1 && id !== 2 ? (
														<Link to={`/profile/${admin.id}`}>
															{admin.username}
														</Link>
													) : (
														"admin"
													)}
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
										{admin && getUserfromCookie().userId === admin.id ? (
											<React.Fragment>
												<Icon
													link
													color="blue"
													onClick={() => setOpen(true)}
													name="add circle"
												/>
												<b>
													<Link
														to="#"
														onClick={() => setOpen(true)}
														style={{ color: "#4183C4" }}
													>
														Add members
													</Link>
												</b>
											</React.Fragment>
										) : null}
									</Card.Content>
								</Card>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Grid.Column>
				<Grid.Column width={12}>{description}</Grid.Column>
			</Grid>
			{open ? (
				<InviteMembersModal
					groupId={id}
					name={name}
					open={open}
					setOpen={setOpen}
				/>
			) : null}
		</PlainSegment>
	);
};
export default GroupDescription;

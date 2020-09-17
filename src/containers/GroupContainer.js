import styled from "styled-components";
import React from "react";
import hdate from "human-date";
import {
	Button,
	Form,
	Grid,
	Segment,
	Header,
	Icon,
	Card,
	Image,
	Divider,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const GroupContainer = styled.div`
	grid-column-start: 2;
	height: 100%;
	background: #e6f1f5;
`;

const Group = ({ image, admin, createdAt, description, members, name }) => {
	return (
		<GroupContainer>
			<Segment placeholder>
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
										</Card.Content>
									</Card>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Grid.Column>
					<Grid.Column width={12}>{description}</Grid.Column>
				</Grid>
			</Segment>
			<Segment>
				<Header>Want to share something ? </Header>
				<Form reply>
					<Form.TextArea rows="8" />
					<Button content="Post" labelPosition="left" icon="edit" primary />
				</Form>
			</Segment>
		</GroupContainer>
	);
};

export default Group;

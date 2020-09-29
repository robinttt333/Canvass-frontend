import styled from "styled-components";
import React from "react";
import { Popup, Grid, Icon, Menu, Label, Header } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import PlainSegment from "./PlainSegment";
import { GET_USER_GROUPS } from "../graphql/Group";
import { useHistory } from "react-router-dom";
import { NEW_POST_TO_MY_GROUP_SUBSCRIPTION } from "../graphql/Post";
import { UPDATE_LAST_POST_SEEN } from "../graphql/LastPostSeen";

const LeftSidebarWrapper = styled.div`
	background: #e6f1f5;
	position: fixed;
	height: 100%;
	width: 25%;
	z-index: 1;
	overflow-y: auto;
`;
const LeftSidebar = ({ name, groupId }) => {
	const history = useHistory();
	const [updateLastPostSeen] = useMutation(UPDATE_LAST_POST_SEEN);
	const { subscribeToMore, loading, data } = useQuery(GET_USER_GROUPS, {
		fetchPolicy: "network-only",
	});

	const changeGroupHandle = async (id) => {
		await updateLastPostSeen({ variables: { groupId } });
		history.push(`/group/${id}`);
	};

	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: NEW_POST_TO_MY_GROUP_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				const post = subscriptionData.data.postAddedToMyGroup;
				if (post.groupId === groupId) return prev;
				// filter the group to which this new post belongs
				const group = prev.getUserGroups.filter(
					({ group: { id } }) => id === post.groupId
				)[0];
				// increment the number of unseen posts for this group
				return {
					getUserGroups: [
						prev.getUserGroups,
						{ ...group, unseenPosts: group.unseenPosts + 1 },
					],
				};
			},
		});
		return () => {
			unsubscribe();
		};
		// eslint-disable-next-line
	}, [name]);

	if (loading) return null;
	const groups = data.getUserGroups;
	const activeItem = name;
	return (
		<LeftSidebarWrapper>
			<PlainSegment style={{ background: "#e6f1f5" }}>
				<Grid divided="vertically">
					<Grid.Row columns={2}>
						<Grid.Column>
							<Header>
								<Icon name="group" />
								My Groups
							</Header>
						</Grid.Column>
						<Grid.Column style={{ textAlign: "right" }}>
							<Popup
								content="Create new group"
								position="top right"
								basic
								trigger={
									<Icon
										link
										onClick={() => history.push("/group/new")}
										name="add circle"
									/>
								}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Menu vertical secondary style={{ width: "100%" }}>
					{groups.map(({ group: { name, id }, unseenPosts }) => (
						<Menu.Item
							key={name}
							name={name}
							active={activeItem === name}
							onClick={() => changeGroupHandle(id)}
						>
							{unseenPosts && activeItem !== name ? (
								<Label color="teal">{unseenPosts}</Label>
							) : null}
							{name}
						</Menu.Item>
					))}
				</Menu>
			</PlainSegment>
		</LeftSidebarWrapper>
	);
};
export default LeftSidebar;

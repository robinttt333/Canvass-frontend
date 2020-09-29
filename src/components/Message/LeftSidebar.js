import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { Header, Label, Menu, Image, Dimmer, Loader } from "semantic-ui-react";
import React from "react";
import { GET_CHAT_MEMBERS } from "../../graphql/Message";
import { Link } from "react-router-dom";
import { TOGGLE_USER_JOINED_SUBSCRIPTION } from "../../graphql/User";
import { getRelativeTime } from "../../util";

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : <Red>●</Red>);
const Green = styled.span`
	color: #38978d;
`;

const Red = styled.span`
	color: red;
`;
const LeftSidebarWrapper = styled.div`
	background: #e6f1f5;
	height: 100%;
	position: fixed;
	width: 15%;
	grid-column: 1 / span 1;
`;

const LastSeen = ({ lastSeen }) => {
	if (!lastSeen) return null;
	if (lastSeen === "active now") return lastSeen;
	let time = getRelativeTime(lastSeen);
	if (time === "just now") time = "1 second ago";
	return (
		<i>
			last seen {"  "}
			{time}
		</i>
	);
};

const LeftSidebar = ({ user }) => {
	const { subscribeToMore, loading, data } = useQuery(GET_CHAT_MEMBERS, {
		variables: {},
		pollInterval: 500,
	});
	const userId = user && user.id;
	// change last seen of user accordingly
	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: TOGGLE_USER_JOINED_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				const newChatMembersList = prev.getChatMembers.map((member) =>
					member.id !== subscriptionData.data.toggleUserJoined.id
						? member
						: subscriptionData.data.toggleUserJoined
				);
				return {
					getChatMembers: newChatMembersList,
				};
			},
		});
		return () => unsubscribe();
		//eslint-disable-next-line
	}, []);
	// update chat member list when a new person messages us
	//React.useEffect(() => {
	//const unsubscribe = subscribeToMore({
	//document: NEW_CHAT_MEMBER_SUBSCRIPTION,
	//updateQuery: (prev, { subscriptionData }) => {
	//if (!subscriptionData.data) return prev;
	//return {
	//getChatMembers: [
	//...prev.getChatMembers,
	//subscriptionData.data.chatMemberAdded,
	//],
	//};
	//},
	//});
	//return () => unsubscribe();
	////eslint-disable-next-line
	//}, []);

	if (loading)
		return (
			<Dimmer inverted active>
				<Loader>Loading</Loader>
			</Dimmer>
		);

	let chatMembers = data.getChatMembers;
	if (userId) {
		let found = false;
		chatMembers.forEach((member) => {
			if (member.user.id === userId) found = true;
		});

		if (!found)
			chatMembers = [{ user, unreadMessagesCount: 0 }, ...chatMembers];
	}
	const activeItem = userId;
	return (
		<LeftSidebarWrapper>
			<Menu fluid tabular vertical size="large">
				{chatMembers.length ? (
					chatMembers.map(
						({
							unreadMessagesCount,
							user: {
								id,
								username,
								profile: { dp, lastSeen },
							},
						}) => (
							<Link to={`/chat/${id}`} key={id}>
								<Menu.Item active={activeItem === id}>
									<Image src={dp} avatar style={{ marginRight: "10px" }} />
									{username}
									{unreadMessagesCount ? (
										<Label color="red" size="mini" style={{ top: ".1em" }}>
											{unreadMessagesCount}
										</Label>
									) : null}
									<br />
									<small
										style={{
											position: "relative",
											left: "40px",
											bottom: "10px",
											color: "grey",
											fontWeight: "normal",
											fontSize: ".2em",
										}}
									>
										<Bubble on={lastSeen === "active now" ? true : false} />{" "}
										<LastSeen lastSeen={lastSeen} />
									</small>
								</Menu.Item>
							</Link>
						)
					)
				) : (
					<Header style={{ marginTop: "10px" }}>Sorry nothing here </Header>
				)}
			</Menu>
		</LeftSidebarWrapper>
	);
};
export default LeftSidebar;

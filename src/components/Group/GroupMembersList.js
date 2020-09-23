import { getRelativeTime } from "../../util";
import React from "react";
import { Image, List, Header } from "semantic-ui-react";
import PlainSegment from "../PlainSegment";
import { getUserfromCookie } from "../../util";

import {
	GET_GROUP_MEMBERS,
	NEW_GROUP_MEMBER_SUBSCRIPTION,
} from "../../graphql/Member";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GroupMembersList = ({ groupId }) => {
	const { subscribeToMore, loading, data } = useQuery(GET_GROUP_MEMBERS, {
		variables: { groupId },
	});

	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: NEW_GROUP_MEMBER_SUBSCRIPTION,
			variables: { groupId: parseInt(groupId) },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				const newMember = subscriptionData.data.groupMemberAdded;
				return {
					getGroupMembers: [newMember, ...prev.getGroupMembers],
				};
			},
		});
		return () => unsubscribe();
		//eslint-disable-next-line
	}, [groupId]);

	if (loading) return null;
	const members = data.getGroupMembers;
	return (
		<PlainSegment
			style={{
				background: "#e6f1f5",
				height: "100%",
			}}
		>
			<Header>Group Members</Header>
			<List divided>
				{members.map(
					({
						user: {
							profile: { dp },
							username,
							id,
						},
						memberSince,
					}) => (
						<List.Item key={username}>
							<Image avatar src={dp} />
							<List.Content>
								<Link
									to={
										getUserfromCookie().userId === id
											? `/profile/${getUserfromCookie().userId}`
											: `/chat/${id}`
									}
								>
									<List.Header>{username}</List.Header>
									Joined {getRelativeTime(memberSince)}
								</Link>
							</List.Content>
						</List.Item>
					)
				)}
			</List>
		</PlainSegment>
	);
};
export default GroupMembersList;

import { getRelativeTime } from "../../util";
import React from "react";
import { Icon, Image, List, Header } from "semantic-ui-react";
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

	const userId = getUserfromCookie().userId;
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
	//bring the current user to top of the list
	const members_ = data.getGroupMembers;
	let me, members;
	const membersWithoutMe = members_.filter((member) => {
		if (member.user.id !== userId) return true;
		me = member;
		return false;
	});
	// I may not be a member of this group
	if (me) members = [me, ...membersWithoutMe];
	else members = membersWithoutMe;
	return (
		<PlainSegment
			style={{
				background: "#e6f1f5",
				height: "70%",
			}}
		>
			<Header>
				<Icon name="user circle" />
				Group Members
			</Header>
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
						<List.Item key={id}>
							<Image avatar src={dp} />
							<List.Content>
								<Link to={`/profile/${id}`}>
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

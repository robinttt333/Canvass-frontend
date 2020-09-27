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
									<List.Header>
										{id === getUserfromCookie().userId ? "me" : username}
									</List.Header>
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

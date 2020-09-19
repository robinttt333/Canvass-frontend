import hdate from "human-date";
import React from "react";
import { Image, List, Header } from "semantic-ui-react";
import PlainSegment from "../PlainSegment";
import { GET_GROUP_MEMBERS } from "../../graphql/Member";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GroupMembersList = ({ groupId }) => {
	console.log(groupId);
	const { loading, data } = useQuery(GET_GROUP_MEMBERS, {
		variables: { groupId },
	});
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
								<Link to={`/chat/${id}`}>
									<List.Header>{username}</List.Header>
									Joined {hdate.relativeTime(memberSince)}
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

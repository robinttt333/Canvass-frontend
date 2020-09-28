import React from "react";
import { Icon, Message, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { JOIN_GROUP_MUTATION } from "../../graphql/Group";

const PublicGroupWarning = ({ refetch, groupId }) => {
	const [joinGroup] = useMutation(JOIN_GROUP_MUTATION);
	const joinHandler = async (e) => {
		const {
			data: {
				joinGroup: { ok },
			},
		} = await joinGroup({ variables: { groupId } });
		if (ok) refetch();
	};
	return (
		<Message negative style={{ margin: "10px" }}>
			<Message.Header>
				You are currently not a member
				<Icon name="warning" />
			</Message.Header>
			<Message.Content>
				<Button color="green" onClick={joinHandler}>
					Join
				</Button>
			</Message.Content>
		</Message>
	);
};
export default PublicGroupWarning;

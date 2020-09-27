import React from "react";
import { Label, Icon } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_UNREAD_MESSAGES_COUNT } from "../../graphql/Message";

const UnreadMessages = () => {
	const { loading, data } = useQuery(GET_UNREAD_MESSAGES_COUNT, {
		fetchPolicy: "network-only",
		//pollInterval: 500,
	});
	if (loading) return null;

	const unreadMessagesCount = data.getUnreadMessagesCount;

	return (
		<React.Fragment>
			<Icon name="mail" />
			{unreadMessagesCount ? (
				<Label color="red" floating size="mini" style={{ top: ".1em" }}>
					{unreadMessagesCount}
				</Label>
			) : null}
		</React.Fragment>
	);
};
export default UnreadMessages;

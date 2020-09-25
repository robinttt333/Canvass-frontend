import React from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button, Header, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import {
	SEND_FRIEND_REQUEST,
	ACCEPT_FRIEND_REQUEST,
	CANCEL_FRIEND_REQUEST,
} from "../../graphql/Friend";

export default ({ userId, status }) => {
	const history = useHistory();
	const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST);
	const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST);
	const [cancelFriendRequest] = useMutation(CANCEL_FRIEND_REQUEST);

	const [open, setOpen] = React.useState(false);

	const handleButtonClick = async (_) => {
		const {
			data: {
				sendFriendRequest: { ok },
			},
		} = await sendFriendRequest({
			variables: { friendId: parseInt(userId) },
		});
		if (!ok) setOpen(true);
	};
	const handleCancel = async (_) => {
		const {
			data: {
				cancelFriendRequest: { ok },
			},
		} = await cancelFriendRequest({
			variables: { userId: parseInt(userId) },
		});
		if (!ok) setOpen(true);
	};
	const handleAccept = async (_) => {
		const {
			data: {
				acceptFriendRequest: { ok },
			},
		} = await acceptFriendRequest({
			variables: { userId: parseInt(userId) },
		});
		if (!ok) setOpen(true);
	};

	return (
		<React.Fragment>
			<Header as="h2">
				<Header.Content>
					{status === "NONE" ? (
						<Button onClick={handleButtonClick} size="mini" color="blue">
							<Icon name="user plus" />
							Send Friend Request
						</Button>
					) : null}
					{status === "PENDING" ? (
						<Button size="mini" disabled>
							<Icon name="user plus" />
							Friend Request Pending
						</Button>
					) : null}
					{status === "ACCEPT" ? (
						<Button size="mini" color="green" onClick={handleAccept}>
							<Icon name="check" inverted />
							Accept Request
						</Button>
					) : null}
					{status === "ACCEPT" ? (
						<Button size="mini" color="red" onClick={handleCancel}>
							<Icon name="close" />
							Cancel Request
						</Button>
					) : null}
					{status === "CONFIRMED" ? (
						<Button size="mini" onClick={() => history.push(`/chat/${userId}`)}>
							<Icon name="mail" />
							Send Message
						</Button>
					) : null}
				</Header.Content>
			</Header>
			<Modal dimmer={true} open={open} onClose={() => setOpen(false)}>
				<Modal.Header>Internal server error</Modal.Header>
				<Modal.Content>
					Looks like something went wrong...Please try again later
				</Modal.Content>
				<Modal.Actions>
					<Button negative onClick={() => setOpen(false)}>
						Close
					</Button>
				</Modal.Actions>
			</Modal>
		</React.Fragment>
	);
};

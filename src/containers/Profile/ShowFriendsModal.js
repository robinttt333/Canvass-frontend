import React from "react";
import { List, Button, Image, Modal } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_FRIENDS } from "../../graphql/User";
import { Link } from "react-router-dom";

const ShowFriendsModal = ({ username, open, setOpen, userId }) => {
	const { loading, data } = useQuery(GET_FRIENDS, { variables: { userId } });
	if (loading) return null;
	const friends = data.getFriends;
	return (
		<Modal
			centered={false}
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
		>
			<Modal.Header>Friends of {username}</Modal.Header>
			<Modal.Content>
				<List>
					{friends.map(({ id, username, profile: { dp, status } }) => (
						<List.Item key={id}>
							<Image avatar src={dp} />
							<List.Content>
								<List.Header>
									<Link to={`/profile/${id}`}>{username}</Link>
								</List.Header>
								<List.Description>{status}</List.Description>
							</List.Content>
						</List.Item>
					))}
				</List>
			</Modal.Content>
			<Modal.Actions>
				<Button color="red" onClick={() => setOpen(false)}>
					Close
				</Button>
			</Modal.Actions>
		</Modal>
	);
};
export default ShowFriendsModal;

import React from "react";
import { GET_NON_GROUP_AND_UNINVITED_MEMBERS } from "../../graphql/Member";
import { INVITE_GROUP_MEMBERS } from "../../graphql/Member";
import { Message, Button, Modal } from "semantic-ui-react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useQuery, useMutation } from "@apollo/client";

//const options = [
//{ value: "chocolate", label: "Chocolate" },
//{ value: "strawberry", label: "Strawberry" },
//{ value: "vanilla", label: "Vanilla" },
//];

const animatedComponents = makeAnimated();

const InviteMembersModal = ({ groupId, name, open, setOpen }) => {
	const { loading, data } = useQuery(GET_NON_GROUP_AND_UNINVITED_MEMBERS, {
		variables: { username: "", groupId: parseInt(groupId) },
		fetchPolicy: "network-only",
	});
	const [inviteGroupMembers] = useMutation(INVITE_GROUP_MEMBERS);
	const [selectedOptions, setSelectedOptions] = React.useState(null);
	const [success, setSuccess] = React.useState(false);
	const [res, setRes] = React.useState({});

	if (loading) return null;
	const nonMembers = data.getNonGroupAndUninvitedMembers;
	const options = nonMembers.map(({ username, id }) => ({
		value: id,
		label: username,
	}));

	const handleButtonClick = async (_) => {
		if (!selectedOptions) return setOpen(false);
		const members = selectedOptions.map(({ value }) => value);
		const {
			data: {
				inviteGroupMembers: { ok },
			},
		} = await inviteGroupMembers({
			variables: { groupId: parseInt(groupId), members },
		});

		if (ok) {
			setSuccess(true);
			setRes({
				type: "success",
				header: "SUCCESS",
				message: "Successfully sent an invite to the above members",
			});
		} else {
			setRes({
				type: "error",
				header: "ERROR",
				message: "Oops something went wrong...Please try again later",
			});
		}
	};
	return (
		<Modal dimmer={true} open={open} onClose={() => setOpen(false)}>
			<Modal.Header>Select users to invite to join {name}</Modal.Header>
			<Modal.Content>
				<Select
					closeMenuOnSelect={false}
					components={animatedComponents}
					isMulti
					defaultValue={selectedOptions}
					onChange={setSelectedOptions}
					options={options}
				/>
			</Modal.Content>
			<Modal.Actions>
				{res && res.type === "success" ? (
					<Message positive style={{ textAlign: "left" }}>
						<Message.Header>{res.header}</Message.Header>
						<p>{res.message}</p>
					</Message>
				) : null}
				{res && res.type === "error" ? (
					<Message negative style={{ textAlign: "left" }}>
						<Message.Header>{res.header}</Message.Header>
						<p>{res.message}</p>
					</Message>
				) : null}

				{!success ? (
					<Button primary onClick={handleButtonClick}>
						Done
					</Button>
				) : null}
				{success ? (
					<Button primary onClick={() => setOpen(false)}>
						Close
					</Button>
				) : null}
			</Modal.Actions>
		</Modal>
	);
};
export default InviteMembersModal;

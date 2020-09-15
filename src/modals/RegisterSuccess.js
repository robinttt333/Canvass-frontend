import React from "react";
import { Button, Modal } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const RegisterSuccessModal = ({ open, setOpen }) => {
	const history = useHistory();
	return (
		<Modal
			closeOnDimmerClick={false}
			dimmer="blurring"
			open={open}
			onClose={() => setOpen(false)}
		>
			<Modal.Header>Congratulations</Modal.Header>
			<Modal.Content>
				Your account has been created successfully!!
				<br />
				Click on the button below to login
			</Modal.Content>
			<Modal.Actions>
				<Button
					positive
					onClick={() => {
						setOpen(false);
						history.push("/login");
					}}
				>
					Login
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default RegisterSuccessModal;

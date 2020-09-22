import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";
const ImageCropModal = ({ setOpen, open, src }) => {
	const [crop, setCrop] = React.useState({ aspect: 16 / 9 });
	return (
		<Modal
			basic
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
		>
			<Modal.Content></Modal.Content>
			<Modal.Actions>
				<Button basic color="red" inverted onClick={() => setOpen(false)}>
					<Icon name="remove" /> Cancel
				</Button>
				<Button color="green" inverted onClick={() => setOpen(false)}>
					<Icon name="checkmark" /> Save
				</Button>
			</Modal.Actions>
		</Modal>
	);
};
export default ImageCropModal;

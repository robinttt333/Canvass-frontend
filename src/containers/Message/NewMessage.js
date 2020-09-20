import React from "react";
import { Icon, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { CREATE_MESSAGE_MUTATION } from "../../graphql/Message";
import { useMutation } from "@apollo/client";
import styled from "styled-components";

const NewMessageWrapper = styled.div`
	grid-column: 2 / span 1;
	grid-row: 2 / span 1;
	margin: 0 10px;
	margin-top: 10px;
`;
const NewMessage = ({ receiver }) => {
	const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION);

	const formik = useFormik({
		initialValues: {
			content: "",
		},
		validate: (values) => {
			const errors = {};
			if (values.content.length === 0)
				errors.content = "Message cannot be empty";
			return errors;
		},
		onSubmit: async (_) => {
			const {
				data: {
					createMessage: { error, ok },
				},
			} = await createMessage({
				variables: {
					content: formik.values.content,
					receiver,
				},
			});
			if (ok) {
				formik.resetForm();
			} else {
				formik.errors.content = error.message;
			}
		},
	});
	return (
		<NewMessageWrapper>
			<Form>
				<Form.Group>
					<Form.Field width={14}>
						<Form.Input
							name="content"
							onChange={formik.handleChange}
							value={formik.values.content}
						/>
					</Form.Field>
					<Button primary onClick={formik.handleSubmit}>
						<Icon name="send" />
						Send
					</Button>
				</Form.Group>
			</Form>
		</NewMessageWrapper>
	);
};
export default NewMessage;

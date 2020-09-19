import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT_MUTATION } from "../../graphql/Comment";

const NewComment = ({ postId }) => {
	const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
	const formik = useFormik({
		initialValues: {
			content: "",
		},
		validate: (values) => {
			const errors = {};
			if (values.content.length === 0)
				errors.content = "Comment cannot be empty";
			return errors;
		},
		onSubmit: async ({ content }) => {
			const {
				data: {
					createComment: { ok, error },
				},
			} = await createComment({
				variables: {
					content,
					postId,
				},
			});
			if (ok) {
				formik.resetForm();
				return;
			}

			formik.errors.content = error.message;
			return;
		},
	});

	return (
		<Form reply onSubmit={formik.handleSubmit}>
			<Form.TextArea
				onChange={formik.handleChange}
				value={formik.values.content}
				error={formik.errors.content}
				name="content"
			/>
			<Button
				size="mini"
				content="Comment"
				primary
				type="submit"
				onSubmit={formik.handleChange}
			/>
		</Form>
	);
};
export default NewComment;

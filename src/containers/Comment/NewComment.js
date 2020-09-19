import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT_MUTATION } from "../../graphql/Comment";

const NewComment = ({ postId, initialContent, setInitialContent }) => {
	const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
	console.log(initialContent);
	const formik = useFormik({
		// reinitialize form whenever initialValues change
		// This is desirable when a user clicks reply on a comment
		// we need to set the initialValues to the user name
		enableReinitialize: true,
		initialValues: {
			content: initialContent,
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
				setInitialContent("");
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

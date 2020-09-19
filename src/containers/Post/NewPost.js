import React from "react";
import { Form, Header, Button } from "semantic-ui-react";
import PlainSegment from "../../components/PlainSegment";
import { useFormik } from "formik";
import { CREATE_POST_MUTATION } from "../../graphql/Post";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

const NewPost = () => {
	const [createPost] = useMutation(CREATE_POST_MUTATION);
	const { groupId } = useParams();
	const formik = useFormik({
		initialValues: {
			content: "",
		},
		validate: (values) => {
			const errors = {};
			if (values.content.length === 0)
				errors.content = "Content cannot be empty";
			return errors;
		},
		onSubmit: async (_) => {
			const {
				data: {
					createPost: { error, ok },
				},
			} = await createPost({
				variables: {
					content: formik.values.content,
					groupId: parseInt(groupId),
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
		<PlainSegment>
			<Header>Want to share something ? </Header>
			<Form onSubmit={formik.handleSubmit}>
				<Form.TextArea
					rows="8"
					onChange={formik.handleChange}
					value={formik.values.content}
					error={formik.errors.content}
					name="content"
				/>
				<Button
					type="submit"
					content="Post"
					labelPosition="right"
					icon="edit"
					primary
					onClick={formik.handleSubmit}
				/>
			</Form>
		</PlainSegment>
	);
};
export default NewPost;

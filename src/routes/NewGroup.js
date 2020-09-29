import React from "react";
import {
	Label,
	Message,
	Form,
	Button,
	Checkbox,
	Header,
} from "semantic-ui-react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import PlainSegment from "../components/PlainSegment";
import "react-markdown-editor-lite/lib/index.css";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import { useFormik } from "formik";
import { CREATE_GROUP_MUTATION } from "../graphql/Group";
import { useMutation } from "@apollo/client";
import TagsInput from "../containers/TagsInput";

const NewGroupWrapper = styled.div`
	margin: 20px;
`;

const NewGroup = () => {
	const mdEditor = React.useRef(null);
	const [createGroup] = useMutation(CREATE_GROUP_MUTATION);
	const history = useHistory();
	const [error, setError] = React.useState(null);
	//tags
	const [currentValues, setCurrentValues] = React.useState([]);
	const formik = useFormik({
		// reinitialize form whenever initialValues change
		// This is desirable when a user clicks reply on a comment
		// we need to set the initialValues to the user name
		enableReinitialize: true,
		initialValues: {
			name: "",
			description: "",
			status: false,
		},
		validate: (values) => {
			const errors = {};
			if (values.name.length === 0) errors.name = "Group name cannot be empty";
			return errors;
		},
		onSubmit: async ({ name, status }) => {
			const description = mdEditor.current.getMdValue();
			const {
				data: {
					createGroup: { ok, id, error: err },
				},
			} = await createGroup({
				variables: { name, description, public: !status, tags: currentValues },
			});
			setError(err);
			if (ok) {
				setError(null);
				history.push(`/group/${id}`);
			}
		},
	});
	const [value, setValue] = React.useState("");

	const handleEditorChange = ({ text }) => {
		const newValue = text.replace(/\d/g, "");
		setValue(newValue);
	};
	return (
		<NewGroupWrapper>
			<PlainSegment>
				<Header style={{ textAlign: "center" }}>Create new Group</Header>
				<Form>
					<Form.Field>
						<Form.Input
							error={
								formik.errors.name && formik.touched.name
									? { content: formik.errors.name, pointing: "below" }
									: null
							}
							label="Name"
							placeholder="Group Name"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							name="name"
						/>
					</Form.Field>
					<Form.Field error={formik.touched.description && value === ""}>
						<label>Description</label>
						<Editor
							ref={mdEditor}
							placeholder="Write something"
							value={value}
							style={{
								height: "300px",
							}}
							name="description"
							onBlur={formik.handleBlur}
							onChange={handleEditorChange}
							renderHTML={(text) => <ReactMarkdown source={text} />}
						/>
					</Form.Field>
					<Form.Field>
						<Checkbox
							name="status"
							onChange={(e, { name, checked }) =>
								formik.setFieldValue(name, !!checked)
							}
							label="Do you want the group to be private ?"
						/>
					</Form.Field>
					<Form.Field>
						{currentValues.length > 0 && currentValues.length !== 5 ? (
							<Label pointing="below">Add 5 tags</Label>
						) : null}
						<TagsInput
							currentValues={currentValues}
							setCurrentValues={setCurrentValues}
						/>
					</Form.Field>
					<Button
						type="submit"
						primary
						style={{ marginTop: "10px" }}
						onClick={formik.handleSubmit}
						disabled={
							!!(
								formik.errors.name ||
								!formik.touched.name ||
								value === "" ||
								currentValues.length !== 5
							)
						}
					>
						Create
					</Button>
				</Form>
				{error && error.message ? (
					<Message negative>
						<Message.Header>{error.path.toUpperCase()}</Message.Header>
						<p>{error.message}</p>
					</Message>
				) : null}{" "}
			</PlainSegment>
		</NewGroupWrapper>
	);
};

export default NewGroup;

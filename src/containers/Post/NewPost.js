import React from "react";
import { Form, Header, Button } from "semantic-ui-react";
import PlainSegment from "../../components/PlainSegment";
import { CREATE_POST_MUTATION } from "../../graphql/Post";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";

const NewPost = () => {
	const [createPost] = useMutation(CREATE_POST_MUTATION);
	const { groupId } = useParams();

	////const formik = useFormik({
	//initialValues: {
	//content: "",
	//},
	//validate: (values) => {
	//const errors = {};
	//if (values.content.length === 0)
	//errors.content = "Content cannot be empty";
	//return errors;
	//},
	//onSubmit: async (_) => {
	//const {
	//data: {
	//createPost: { error, ok },
	//},
	//} = await createPost({
	//variables: {
	//content: formik.values.content,
	//groupId: parseInt(groupId),
	//},
	//});

	//if (ok) {
	//formik.resetForm();
	//} else {
	//formik.errors.content = error.message;
	//}
	//},
	//});

	const mdEditor = React.useRef(null);

	const [value, setValue] = React.useState("");

	const handleClick = async () => {
		if (mdEditor.current) {
			const content = mdEditor.current.getMdValue();
			if (content === "") return;
			await createPost({
				variables: { content, groupId: parseInt(groupId) },
			});
			setValue("");
		}
	};

	const handleEditorChange = ({ text }) => {
		const newValue = text.replace(/\d/g, "");
		setValue(newValue);
	};
	return (
		<PlainSegment>
			<Header>Want to share something ? </Header>
			<Form>
				<Editor
					ref={mdEditor}
					placeholder="Write something"
					value={value}
					style={{
						height: "300px",
					}}
					onChange={handleEditorChange}
					renderHTML={(text) => <ReactMarkdown source={text} />}
				/>
				<Button
					style={{ marginTop: "10px " }}
					onClick={handleClick}
					type="submit"
					content="Post"
					labelPosition="right"
					icon="edit"
					primary
				/>
			</Form>
		</PlainSegment>
	);
};
export default NewPost;

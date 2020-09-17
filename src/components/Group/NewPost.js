import React from "react";
import { Form, Segment, Header, Button } from "semantic-ui-react";

const NewPost = () => {
	return (
		<Segment>
			<Header>Want to share something ? </Header>
			<Form reply>
				<Form.TextArea rows="8" />
				<Button content="Post" labelPosition="left" icon="edit" primary />
			</Form>
		</Segment>
	);
};
export default NewPost;

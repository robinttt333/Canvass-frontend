import React from "react";
import { Comment as SemanticComment, Accordion } from "semantic-ui-react";
import NewComment from "./NewComment";
import Comment from "../../components/Comment/Comment";
import { NEW_COMMENT_SUBSCRIPTION } from "../../graphql/Comment";

const CommentList = ({ postId, subscribeToMore, comments }) => {
	const [initialContent, setInitialContent] = React.useState("");
	React.useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: NEW_COMMENT_SUBSCRIPTION,
			variables: { postId },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				const newComment = subscriptionData.data.commentAdded;
				let date = new Date();
				date.setSeconds(date.getSeconds() - 1);
				newComment.createdAt = date;
				return {
					getComments: [newComment, ...prev.getComments],
				};
				// hdate breaks with new post date so we change time to 1 sec before actual value
			},
		});
		return () => unsubscribe();
		//eslint-disable-next-line
	}, []);
	return (
		<Accordion.Content active>
			<SemanticComment.Group size="small">
				{comments.map((comment) => (
					<Comment
						comment={comment}
						key={comment.id}
						setInitialContent={setInitialContent}
					/>
				))}
			</SemanticComment.Group>
			<NewComment
				postId={postId}
				initialContent={initialContent}
				setInitialContent={setInitialContent}
			/>
		</Accordion.Content>
	);
};
export default CommentList;

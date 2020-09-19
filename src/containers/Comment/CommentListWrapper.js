import React from "react";
import { Dimmer, Loader, Accordion } from "semantic-ui-react";
import CommentTitle from "./CommentTitle";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS_QUERY } from "../../graphql/Comment";
import CommentList from "./CommentList";
//This is a wrapper that will use a state variable called showComments to mount and unmount
//the actual comment list because we need to create a subcription every time this component is
//mounted and remove it when it unmounts

const CommentListWrapper = ({ postId }) => {
	const [showComments, setShowComments] = React.useState(false);
	const { subscribeToMore, loading, data } = useQuery(GET_COMMENTS_QUERY, {
		variables: { postId },
	});

	if (loading)
		return (
			<Dimmer inverted active>
				<Loader>Loading</Loader>
			</Dimmer>
		);
	const comments = data.getComments;
	return (
		<Accordion style={{ display: "inline" }}>
			<CommentTitle
				count={comments.length}
				showComments={showComments}
				toggleShowComments={() => setShowComments(!showComments)}
			/>
			{showComments ? (
				<CommentList
					postId={postId}
					comments={comments}
					subscribeToMore={subscribeToMore}
				/>
			) : null}
		</Accordion>
	);
};
export default CommentListWrapper;

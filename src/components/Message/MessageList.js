import React from "react";
import { Comment, Segment } from "semantic-ui-react";
import { getRelativeTime, getUserfromCookie } from "../../util";
import styled from "styled-components";

const MessageListWrapper = styled.div`
	grid-column: 2 / span 1;
	grid-row: 1 / span 1;
	margin-top: 10px;
	margin-left: 10px;
	margin-right: 0;
	overflow: auto;
`;
const MessageList = ({ messages }) => {
	const me = getUserfromCookie();
	//This part is used to scroll to the bottom of the
	//page automatically once a new message is added
	const bottom = React.useRef();
	React.useEffect(() => {
		bottom.current.scrollIntoView({ behaviour: "smooth" });
	}, [messages]);
	return (
		<MessageListWrapper>
			<Comment.Group style={{ maxWidth: "100%" }}>
				{messages.map(
					({
						id,
						content,
						createdAt,
						sender: {
							id: senderId,
							username,
							profile: { dp },
						},
					}) => (
						<Segment
							key={id}
							color={senderId === me.userId ? "blue" : "green"}
							style={{
								maxWidth: "50%",
								position: "relative",
								left: senderId === me.userId ? "0" : "45%",
							}}
							size="small"
						>
							<Comment>
								<Comment.Avatar as="a" src={dp} />
								<Comment.Content>
									<Comment.Author style={{ display: "inline" }}>
										{username}
									</Comment.Author>
									<Comment.Metadata>
										<div>{getRelativeTime(createdAt)}</div>
									</Comment.Metadata>
									<Comment.Text>{content}</Comment.Text>
								</Comment.Content>
							</Comment>
						</Segment>
					)
				)}
			</Comment.Group>
			<div ref={bottom} />
		</MessageListWrapper>
	);
};
export default MessageList;

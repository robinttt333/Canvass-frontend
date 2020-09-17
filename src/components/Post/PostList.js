import React from "react";
import hdate from "human-date";
import { Feed, Icon, Dimmer, Loader } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { GET_POSTS_QUERY } from "../../graphql/Post";
import { useQuery } from "@apollo/client";
import PlainSegment from "../PlainSegment";
const PostList = () => {
	const { groupId } = useParams();
	const { loading, data } = useQuery(GET_POSTS_QUERY, {
		variables: {
			groupId: parseInt(groupId),
		},
	});
	if (loading)
		return (
			<Dimmer inverted active>
				<Loader>Loading</Loader>
			</Dimmer>
		);

	const posts = data.getPosts;
	return (
		<PlainSegment>
			<Feed>
				{posts.map(
					({
						author: {
							username,
							id: userId,
							profile: { dp },
						},
						id,
						content,
						createdAt,
					}) => (
						<Feed.Event key={id}>
							<Feed.Label image={dp} />
							<Feed.Content>
								<Feed.Summary>
									<Link to={`/profile/${userId}`}> {username}</Link> posted
									<Feed.Date>{hdate.relativeTime(createdAt)}</Feed.Date>
								</Feed.Summary>
								<Feed.Extra text>{content}</Feed.Extra>
								<Feed.Meta>
									<Feed.Like>
										<Icon name="like" />5 Likes
									</Feed.Like>
								</Feed.Meta>
							</Feed.Content>
						</Feed.Event>
					)
				)}
			</Feed>
		</PlainSegment>
	);
};
export default PostList;

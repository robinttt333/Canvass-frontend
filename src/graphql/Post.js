import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
	mutation($content: String!, $groupId: Int!) {
		createPost(content: $content, groupId: $groupId) {
			ok
			error {
				path
				message
			}
			post {
				content
				createdAt
				author {
					username
					profile {
						dp
					}
				}
			}
		}
	}
`;

export const GET_POSTS_QUERY = gql`
	query($groupId: Int!) {
		getPosts(groupId: $groupId) {
			content
			createdAt
			id
			author {
				username
				profile {
					dp
				}
			}
		}
	}
`;

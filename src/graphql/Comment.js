import { gql } from "@apollo/client";

export const CREATE_COMMENT_MUTATION = gql`
	mutation($content: String!, $postId: Int!) {
		createComment(content: $content, postId: $postId) {
			ok
			error {
				path
				message
			}
		}
	}
`;

export const NEW_COMMENT_SUBSCRIPTION = gql`
	subscription OnCommentAdded($postId: Int!) {
		commentAdded(postId: $postId) {
			id
			content
			createdAt
			author {
				id
				username
				profile {
					dp
					id
				}
			}
		}
	}
`;

export const GET_COMMENTS_QUERY = gql`
	query($postId: Int!) {
		getComments(postId: $postId) {
			id
			content
			createdAt
			author {
				id
				username
				profile {
					id
					dp
				}
			}
		}
	}
`;

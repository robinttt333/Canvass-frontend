import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
	mutation($content: String!, $groupId: Int!) {
		createPost(content: $content, groupId: $groupId) {
			ok
			error {
				path
				message
			}
		}
	}
`;

export const TOGGLE_LIKE_MUTATION = gql`
	mutation($postId: Int!) {
		toggleLike(postId: $postId) {
			ok
		}
	}
`;

export const GET_POSTS_QUERY = gql`
	query($groupId: Int!) {
		getPosts(groupId: $groupId) {
			content
			createdAt
			id
			likes
			liked
			author {
				id
				username
				profile {
					dp
				}
			}
		}
	}
`;

export const NEW_POST_SUBSCRIPTION = gql`
	subscription OnPostAdded($groupId: Int!) {
		postAdded(groupId: $groupId) {
			content
			createdAt
			id
			likes
			liked
			author {
				id
				username
				profile {
					dp
				}
			}
		}
	}
`;

export const NEW_POST_TO_MY_GROUP_SUBSCRIPTION = gql`
	subscription {
		postAddedToMyGroup {
			createdAt
			groupId
		}
	}
`;

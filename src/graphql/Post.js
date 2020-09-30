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

export const GET_POST_QUERY = gql`
	query($postId: Int!) {
		getPost(postId: $postId) {
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
					id
				}
			}
		}
	}
`;
export const GET_POSTS_QUERY = gql`
	query($groupId: Int!, $offset: Int!) {
		getPosts(groupId: $groupId, offset: $offset) {
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
					id
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
					id
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

export const LIKE_ADDED_SUBSCRIPTION = gql`
	subscription($postId: Int!) {
		likeAdded(postId: $postId) {
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
					id
				}
			}
		}
	}
`;

export const LIKE_DELETED_SUBSCRIPTION = gql`
	subscription($postId: Int!) {
		likeDeleted(postId: $postId) {
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
					id
				}
			}
		}
	}
`;

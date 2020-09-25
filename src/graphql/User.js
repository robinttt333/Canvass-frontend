import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
	mutation($email: String!, $username: String!, $password: String!) {
		createUser(email: $email, username: $username, password: $password) {
			ok
			error {
				path
				message
			}
		}
	}
`;

export const LOGIN = gql`
	mutation($usernameOrEmail: String!, $password: String!) {
		login(usernameOrEmail: $usernameOrEmail, password: $password) {
			ok
			error {
				path
				message
			}
		}
	}
`;
export const CHANGE_PASSWORD = gql`
	mutation($oldPassword: String!, $newPassword: String!) {
		changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
			ok
			error {
				path
				message
			}
		}
	}
`;

export const TOGGLE_USER_JOINED_SUBSCRIPTION = gql`
	subscription {
		toggleUserJoined {
			id
			username
			profile {
				id
				dp
				lastSeen
			}
		}
	}
`;

export const GET_USER = gql`
	query($userId: Int!) {
		getUser(userId: $userId) {
			username
			id
			profile {
				dp
				id
				dob
				lastSeen
				firstName
				lastName
				status
				gender
			}
		}
	}
`;
export const GET_FRIENDS = gql`
	query($userId: Int!) {
		getFriends(userId: $userId) {
			id
			username
			profile {
				id
				dp
				status
			}
		}
	}
`;

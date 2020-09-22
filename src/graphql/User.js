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

export const TOGGLE_USER_JOINED_SUBSCRIPTION = gql`
	subscription {
		toggleUserJoined {
			id
			username
			profile {
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

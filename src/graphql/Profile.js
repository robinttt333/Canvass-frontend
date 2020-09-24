import { gql } from "@apollo/client";

export const GET_PROFILE_QUERY = gql`
	query($userId: Int!) {
		getProfile(userId: $userId) {
			id
			firstName
			lastName
			status
			dob
			dp
			gender
			createdAt
			friends
			user {
				username
				email
			}
		}
	}
`;

export const UPDATE_PROFILE = gql`
	mutation(
		$userId: Int!
		$firstName: String!
		$lastName: String!
		$status: String!
		$dob: String!
		$gender: Boolean!
	) {
		updateProfile(
			userId: $userId
			firstName: $firstName
			lastName: $lastName
			status: $status
			dob: $dob
			gender: $gender
		) {
			ok
			error {
				message
				path
			}
		}
	}
`;
export const UPDATE_IMAGE = gql`
	mutation($file: Upload!) {
		updateImage(file: $file) {
			ok
			error {
				path
				message
			}
		}
	}
`;

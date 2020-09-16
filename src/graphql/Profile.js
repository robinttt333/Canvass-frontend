import { gql } from "@apollo/client";

export const GET_PROFILE_QUERY = gql`
	query($userId: Int!) {
		getProfile(userId: $userId) {
			firstName
			lastName
			status
			dob
			dp
			sex
			createdAt
			user {
				username
				email
			}
		}
	}
`;

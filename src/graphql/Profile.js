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
			sex
			createdAt
			user {
				username
				email
			}
		}
	}
`;

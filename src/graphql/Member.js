import { gql } from "@apollo/client";

export const GET_GROUP_MEMBERS = gql`
	query($groupId: Int!) {
		getGroupMembers(groupId: $groupId) {
			user {
				id
				username
				profile {
					dp
				}
			}
			memberSince
		}
	}
`;

import { gql } from "@apollo/client";

export const UPDATE_LAST_POST_SEEN = gql`
	mutation($groupId: Int!) {
		updateLastPostSeen(groupId: $groupId) {
			ok
		}
	}
`;

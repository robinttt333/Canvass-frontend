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

export const NEW_GROUP_MEMBER_SUBSCRIPTION = gql`
	subscription OnGroupMemberAdded($groupId: Int!) {
		groupMemberAdded(groupId: $groupId) {
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

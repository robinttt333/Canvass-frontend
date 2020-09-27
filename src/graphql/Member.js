import { gql } from "@apollo/client";

export const GET_GROUP_MEMBERS = gql`
	query($groupId: Int!) {
		getGroupMembers(groupId: $groupId) {
			user {
				id
				username
				profile {
					dp
					id
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
					id
				}
			}
			memberSince
		}
	}
`;

export const INVITE_GROUP_MEMBERS = gql`
	mutation($groupId: Int!, $members: [Int!]!) {
		inviteGroupMembers(groupId: $groupId, members: $members) {
			ok
		}
	}
`;

export const GET_NON_GROUP_AND_UNINVITED_MEMBERS = gql`
	query($username: String!, $groupId: Int!) {
		getNonGroupAndUninvitedMembers(username: $username, groupId: $groupId) {
			username
			id
		}
	}
`;
export const GET_NON_GROUP_MEMBERS = gql`
	query($username: String!, $groupId: Int!) {
		getNonGroupMembers(username: $username, groupId: $groupId) {
			username
			id
		}
	}
`;

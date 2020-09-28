import { gql } from "@apollo/client";

export const GET_GROUP_QUERY = gql`
	query($groupId: Int!) {
		getGroup(groupId: $groupId) {
			id
			name
			members
			description
			image
			admin {
				username
				id
			}
			createdAt
			public
		}
	}
`;

export const GET_USER_GROUPS = gql`
	{
		getUserGroups {
			group {
				id
				name
				image
				members
			}
			unseenPosts
		}
	}
`;

export const CREATE_GROUP_MUTATION = gql`
	mutation($name: String!, $description: String!, $public: Boolean!) {
		createGroup(name: $name, description: $description, public: $public) {
			ok
			id
			error {
				path
				message
			}
		}
	}
`;

export const GET_GROUP_INVITES = gql`
	query {
		getGroupInvites {
			id
			group {
				name
				id
			}
			sender {
				id
				username
				profile {
					dp
				}
			}
			createdAt
		}
	}
`;

export const ACCEPT_GROUP_INVITE = gql`
	mutation($sender: Int!, $groupId: Int!) {
		acceptGroupInvite(sender: $sender, groupId: $groupId) {
			ok
		}
	}
`;

export const CANCEL_GROUP_INVITE = gql`
	mutation($sender: Int!, $groupId: Int!) {
		cancelGroupInvite(sender: $sender, groupId: $groupId) {
			ok
		}
	}
`;

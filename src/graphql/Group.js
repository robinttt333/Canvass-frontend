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

import { gql } from "@apollo/client";

export const GET_GROUP_QUERY = gql`
	query($groupId: Int!) {
		getGroup(groupId: $groupId) {
			id
			name
			members
			description
			image
			admin
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

import { gql } from "@apollo/client";

export const GET_GROUP_QUERY = gql`
	query($groupId: Int!) {
		getGroup(groupId: $groupId) {
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
			id
			name
			image
			members
		}
	}
`;

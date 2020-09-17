import { gql } from "@apollo/client";

const GET_GROUP_QUERY = gql`
	query($groupId: Int!) {
		getGroup(groupId: $groupId) {
			name
			members {
				username
			}
			description
			image
			admin
			createdAt
			public
		}
	}
`;
export default GET_GROUP_QUERY;

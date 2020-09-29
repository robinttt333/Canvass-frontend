import { gql } from "@apollo/client";

export const GET_ALL_TAGS = gql`
	{
		getAllTags {
			value
			id
		}
	}
`;

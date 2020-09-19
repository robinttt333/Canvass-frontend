import { gql } from "@apollo/client";

export const GET_CHAT_MEMBERS = gql`
	{
		getChatMembers {
			id
			username
			profile {
				dp
			}
		}
	}
`;

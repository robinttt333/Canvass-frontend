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

export const GET_CHAT = gql`
	query($userId: Int!) {
		getChat(userId: $userId) {
			id
			content
			sender {
				username
				id
				profile {
					dp
				}
			}
			createdAt
		}
	}
`;

export const CREATE_MESSAGE_MUTATION = gql`
	mutation($content: String!, $receiver: Int!) {
		createMessage(content: $content, receiver: $receiver) {
			ok
			error {
				path
				message
			}
		}
	}
`;

export const NEW_MESSAGE_SUBSCRIPTION = gql`
	subscription {
		messageAdded {
			content
			createdAt
			id
			sender {
				username
				profile {
					dp
				}
			}
		}
	}
`;

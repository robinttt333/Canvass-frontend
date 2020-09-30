import { gql } from "@apollo/client";

export const GET_CHAT_MEMBERS = gql`
	query {
		getChatMembers {
			user {
				id
				username
				profile {
					id
					dp
					lastSeen
				}
			}
			unreadMessagesCount
		}
	}
`;

export const GET_UNREAD_MESSAGES_COUNT = gql`
	query {
		getUnreadMessagesCount
	}
`;

export const GET_CHAT = gql`
	query($userId: Int!, $offset: Int!) {
		getChat(userId: $userId, offset: $offset) {
			id
			content
			sender {
				username
				id
				profile {
					dp
					id
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
					id
					dp
				}
			}
		}
	}
`;

export const NEW_CHAT_MEMBER_SUBSCRIPTION = gql`
	subscription {
		chatMemberAdded {
			username
			id
			profile {
				dp
				id
				lastSeen
			}
		}
	}
`;

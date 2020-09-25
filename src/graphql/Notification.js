import { gql } from "@apollo/client";

export const GET_UNREAD_NOTIFICATIONS = gql`
	{
		getUnreadNotifications {
			id
			sender {
				id
				username
				profile {
					dp
					id
				}
			}
			read
			verb
			text
			object
			target
			post {
				id
			}
			comment {
				id
			}
			group {
				id
				name
			}
		}
	}
`;

export const DELETE_NOTIFICATION_SUBSCRIPTION = gql`
	subscription {
		notificationDeleted {
			id
		}
	}
`;
export const NEW_NOTIFICATION_SUBSCRIPTION = gql`
	subscription {
		notificationAdded {
			id
			sender {
				id
				username
				profile {
					dp
				}
			}
			read
			verb
			text
			object
			target
			post {
				id
			}
			comment {
				id
			}
			group {
				id
				name
			}
		}
	}
`;

export const MARK_NOTIFICATIONS_AS_READ = gql`
	mutation {
		markNotificationsAsRead {
			ok
		}
	}
`;

import { gql } from "@apollo/client";

export const SEND_FRIEND_REQUEST = gql`
	mutation($friendId: Int!) {
		sendFriendRequest(friendId: $friendId) {
			ok
		}
	}
`;

export const ACCEPT_FRIEND_REQUEST = gql`
	mutation($userId: Int!) {
		acceptFriendRequest(userId: $userId) {
			ok
		}
	}
`;

export const CANCEL_FRIEND_REQUEST = gql`
	mutation($userId: Int!) {
		cancelFriendRequest(userId: $userId) {
			ok
		}
	}
`;
export const GET_FRIENDSHIP_STATUS = gql`
	query($friendId: Int!) {
		getFriendshipStatus(friendId: $friendId) {
			ok
			status
		}
	}
`;

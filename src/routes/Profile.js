import React from "react";
import { useQuery } from "@apollo/client";
import ProfileImageAndUserDetails from "../containers/Profile/ProfileImageAndUserDetails";
import UserDetails from "../containers/Profile/UserDetails";
import { Grid, Segment } from "semantic-ui-react";
import { GET_PROFILE_QUERY } from "../graphql/Profile";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Err from "../components/Err";

const ProfileWrapper = styled.div`
	padding: 10px;
`;
const Profile = () => {
	const { userId } = useParams();
	const { loading, data } = useQuery(GET_PROFILE_QUERY, {
		variables: { userId: parseInt(userId) },
		fetchPolicy: "network-only",
		pollInterval: 500,
	});
	if (loading) return null;
	if (!data) return <Err />;
	const profile = data.getProfile;
	return (
		<ProfileWrapper>
			<Segment>
				<Grid relaxed="very">
					<ProfileImageAndUserDetails
						username={profile.user.username}
						dp={profile.dp}
						status={profile.status}
						email={profile.user.email}
						createdAt={profile.createdAt}
						friends={profile.friends}
						userId={userId}
					/>
					<UserDetails
						userId={userId}
						firstName={profile.firstName}
						lastName={profile.lastName}
						gender={profile.gender}
						dob={profile.dob}
					/>
				</Grid>
			</Segment>
		</ProfileWrapper>
	);
};
export default Profile;

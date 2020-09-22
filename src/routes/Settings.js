import { useParams } from "react-router-dom";
import ProfileImage from "../containers/Settings/ProfileImage";
import Profile from "../containers/Settings/Profile";
import styled from "styled-components";
import React from "react";
import { GET_USER } from "../graphql/User";
import { useQuery } from "@apollo/client";
const ProfileSettingsWrapper = styled.div`
	display: grid;
	padding: 10px;
	grid-template-columns: 25% 75%;
	grid-template-rows: 40% 60%;
`;

const Settings = () => {
	const { userId } = useParams();
	const { loading, data } = useQuery(GET_USER, {
		variables: { userId: parseInt(userId) },
	});
	if (loading) return null;
	const { username, profile } = data.getUser;
	return (
		<ProfileSettingsWrapper>
			<ProfileImage dp={profile.dp} />
			<Profile
				userId={parseInt(userId)}
				username={username}
				profile={profile}
			/>
		</ProfileSettingsWrapper>
	);
};

export default Settings;

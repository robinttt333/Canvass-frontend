import { useParams } from "react-router-dom";
import ProfileImage from "../containers/Settings/ProfileImage";
import Profile from "../containers/Settings/Profile";
import Password from "../containers/Settings/Password";
import styled from "styled-components";
import React from "react";
import { GET_USER } from "../graphql/User";
import { useQuery } from "@apollo/client";
import { getUserfromCookie } from "../util";
import { Redirect } from "react-router-dom";
import Err from "../components/Err";

const ProfileSettingsWrapper = styled.div`
	display: grid;
	height: 100%;
	padding: 10px;
	grid-template-columns: 25% 75%;
	grid-template-rows: 50% 50%;
`;

const Settings = () => {
	const { userId } = useParams();
	const { loading, data } = useQuery(GET_USER, {
		variables: { userId: parseInt(userId) },
		fetchPolicy: "network-only",
	});
	const me = getUserfromCookie().userId;
	if (me !== parseInt(userId)) return <Redirect to={`/settings/${me}`} />;
	if (loading) return null;
	if (!data) return <Err />;
	const { username, profile } = data.getUser;
	return (
		<ProfileSettingsWrapper>
			<ProfileImage userId={parseInt(userId)} dp={profile.dp} />
			<Profile
				userId={parseInt(userId)}
				username={username}
				profile={profile}
			/>
			<Password />
		</ProfileSettingsWrapper>
	);
};

export default Settings;

import React from "react";
import { Image } from "semantic-ui-react";
import styled from "styled-components";
const ProfileImageWrapper = styled.div`
	grid-column: 1 / span 1;
	grid-row: 1 / span 1;
	padding: 20px;
	padding-top: 0px;
`;
const ProfileImage = ({ dp }) => {
	return (
		<ProfileImageWrapper>
			<Image src={dp} />;
		</ProfileImageWrapper>
	);
};
export default ProfileImage;

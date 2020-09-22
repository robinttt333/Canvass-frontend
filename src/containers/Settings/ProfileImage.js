import Dropzone from "react-dropzone";
import React from "react";
import styled from "styled-components";
import { Image, Segment } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { UPDATE_IMAGE } from "../../graphql/Profile";
import { useHistory } from "react-router-dom";

const ProfileImageWrapper = styled.div`
	grid-column: 1 / span 1;
	grid-row: 1 / span 1;
	padding: 20px;
	padding-top: 0px;
	text-align: center;
`;

const ProfileImage = ({ dp, userId }) => {
	const [imageUpload] = useMutation(UPDATE_IMAGE);
	const history = useHistory();
	const handleImageUpload = async (file) => {
		const {
			data: {
				updateImage: { ok },
			},
		} = await imageUpload({ variables: { file } });
		if (ok) {
			history.push(`/profile/${userId}`);
		}
	};
	return (
		<ProfileImageWrapper>
			<Dropzone onDrop={([file]) => handleImageUpload(file)}>
				{({ getRootProps, getInputProps }) => (
					<Segment>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<Image src={dp} href="#" />
						</div>

						<div style={{ marginTop: "10px" }}>
							{" "}
							Click on the image to change it
						</div>
					</Segment>
				)}
			</Dropzone>
		</ProfileImageWrapper>
	);
};
export default ProfileImage;

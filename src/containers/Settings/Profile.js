import ProfileSchema from "../../formValidations/Profile";
import React from "react";
import {
	Select,
	Modal,
	Divider,
	Header,
	Form,
	Input,
	TextArea,
	Image,
	Button,
} from "semantic-ui-react";
import styled from "styled-components";
import { useFormik } from "formik";
import Calendar from "./Calendar";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../../graphql/Profile";
import { useHistory } from "react-router-dom";

const genderOptions = [
	{
		key: "Male",
		value: true,
		text: "Male",
	},

	{
		key: "Female",
		value: false,
		text: "Female",
	},
];
const ProfileWrapper = styled.div`
	grid-column: 2 / span 1;
	grid-row: 1 / span 1;
`;

const Profile = ({
	userId,
	username,
	profile: { gender: currentGender, dob, status, dp, firstName, lastName },
}) => {
	const [dateOfBirth, setDateOfBirth] = React.useState(new Date(dob));
	const [gender, setGender] = React.useState(currentGender);
	const [updateProfile] = useMutation(UPDATE_PROFILE);
	const [open, setOpen] = React.useState(false);

	const history = useHistory();

	const formik = useFormik({
		initialValues: {
			firstName,
			lastName,
			status,
			dob: new Date(dob),
		},
		onSubmit: async ({ firstName, lastName, status }) => {
			const {
				data: {
					updateProfile: { ok },
				},
			} = await updateProfile({
				variables: {
					userId,
					firstName,
					lastName,
					status,
					dob: dateOfBirth,
					gender,
				},
			});
			if (ok) {
				setOpen(true);
			}
		},
		validationSchema: ProfileSchema,
	});
	return (
		<ProfileWrapper>
			<Header>
				<Image avatar src={dp} />
				Profile Settings of {username}
			</Header>
			<Divider />
			<Form>
				<Form.Group widths="equal">
					<Form.Field
						id="form-input-control-first-name"
						control={Input}
						label="First Name"
						value={formik.values.firstName}
						onChange={formik.handleChange}
						name="firstName"
						onBlur={formik.handleBlur}
						placeholder="Your first name"
						error={
							formik.errors.firstName && formik.touched.firstName
								? { content: formik.errors.firstName, pointing: "below" }
								: null
						}
					/>
					<Form.Field
						id="form-input-control-last-name"
						control={Input}
						label="Last Name"
						value={formik.values.lastName}
						onChange={formik.handleChange}
						name="lastName"
						onBlur={formik.handleBlur}
						placeholder="Your last name"
						error={
							formik.errors.lastName && formik.touched.lastName
								? { content: formik.errors.lastName, pointing: "below" }
								: null
						}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Field
						width={8}
						id="form-textarea-control-opinion"
						control={TextArea}
						label="Status"
						value={formik.values.status}
						onChange={formik.handleChange}
						name="status"
						placeholder="Your status"
						onBlur={formik.handleBlur}
						error={
							formik.errors.status && formik.touched.status
								? { content: formik.errors.status, pointing: "below" }
								: null
						}
					/>
					<Calendar selected={dateOfBirth} onChange={setDateOfBirth} />
					<Form.Field
						id="form-select-control-opinion"
						name="gender"
						control={Select}
						label="Gender"
						options={genderOptions}
						placeholder="Gender"
						value={gender}
						onChange={(e, { value }) => setGender(value)}
					/>{" "}
				</Form.Group>
				<Form.Field
					id="form-button-control-public"
					control={Button}
					content="Update"
					primary
					type="submit"
					onClick={formik.handleSubmit}
				/>
			</Form>
			<Modal
				open={open}
				header="Success!"
				content="Successfully updated your profile"
				actions={[
					{
						key: "done",
						content: "Done",
						positive: true,
						onClick: () => history.push(`/profile/${userId}`),
					},
				]}
			/>
		</ProfileWrapper>
	);
};
export default Profile;

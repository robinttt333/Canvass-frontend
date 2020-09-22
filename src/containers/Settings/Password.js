import { useFormik } from "formik";
import React from "react";
import PasswordChangeSchema from "../../formValidations/PasswordChangeSchema";
import { CHANGE_PASSWORD } from "../../graphql/User";
import { useHistory } from "react-router-dom";
import {
	Modal,
	Button,
	Message,
	Form,
	Header,
	Divider,
} from "semantic-ui-react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";

const PasswordWrapper = styled.div`
	grid-row: 2 / span 1;
	grid-column: 2 / span 1;
`;

const Password = () => {
	const history = useHistory();
	const [changePassword] = useMutation(CHANGE_PASSWORD);
	const [open, setOpen] = React.useState(false);
	const [resErr, setResErr] = React.useState({});
	const formik = useFormik({
		initialValues: {
			oldPassword: "",
			password: "",
			password1: "",
		},
		onSubmit: async ({ oldPassword, password }) => {
			const {
				data: {
					changePassword: { ok, error },
				},
			} = await changePassword({
				variables: {
					oldPassword,
					newPassword: password,
				},
			});
			if (!ok) {
				setResErr(error);
			} else {
				setResErr({});
				setOpen(true);
			}
		},
		validationSchema: PasswordChangeSchema,
	});
	return (
		<PasswordWrapper>
			<Divider />
			<Header style={{ marginTop: "0px" }}>Password Settings</Header>
			<Form>
				<Form.Input
					label="Old Password"
					type="password"
					name="oldPassword"
					placeholder="Old Password"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.oldPassword}
					error={
						formik.errors.oldPassword && formik.touched.oldPassword
							? { content: formik.errors.oldPassword, pointing: "below" }
							: null
					}
				/>
				<Form.Group>
					<Form.Input
						width={8}
						label="New Password"
						name="password"
						type="password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
						placeholder="new password"
						error={
							formik.errors.password && formik.touched.password
								? { content: formik.errors.password, pointing: "below" }
								: null
						}
					/>
					<Form.Input
						width={8}
						label="New Password"
						type="password"
						onChange={formik.handleChange}
						name="password1"
						onBlur={formik.handleBlur}
						value={formik.values.password1}
						placeholder="New Password"
						error={
							formik.errors.password1 && formik.touched.password1
								? { content: formik.errors.password1, pointing: "below" }
								: null
						}
					/>
				</Form.Group>
				<Button
					type="submit"
					primary
					onClick={formik.handleSubmit}
					disabled={Object.keys(formik.errors).length > 0}
				>
					Update
				</Button>
				<Message
					error
					header={resErr && resErr.path && resErr.path.toUpperCase()}
					content={resErr && resErr.message}
				/>
				<Modal
					open={open}
					header="Success!"
					content="Successfully updated your password"
					actions={[
						{
							key: "done",
							content: "Done",
							positive: true,
							onClick: () => history.push("/logout"),
						},
					]}
				/>
			</Form>
		</PasswordWrapper>
	);
};
export default Password;

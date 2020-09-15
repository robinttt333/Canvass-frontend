import React from "react";
import { useFormik } from "formik";
import { Message, Container, Button, Form, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import RegisterSchema from "../formValidations/Register";
import { CREATE_USER_MUTATION } from "../graphql/User";
import { useMutation } from "@apollo/client";
import RegisterSuccessModal from "../modals/RegisterSuccess";

const Register = () => {
	const [createUser] = useMutation(CREATE_USER_MUTATION);
	const [resErr, setResErr] = React.useState({});
	const [open, setOpen] = React.useState(false);

	const formik = useFormik({
		initialValues: {
			email: "",
			username: "",
			password: "",
			password1: "",
		},
		onSubmit: async ({ email, username, password }) => {
			const {
				data: {
					createUser: { ok, error },
				},
			} = await createUser({
				variables: {
					email,
					username,
					password,
				},
			});
			if (!ok) {
				setResErr(error);
			} else {
				setResErr({});
				setOpen(true);
			}
		},
		validationSchema: RegisterSchema,
	});

	return (
		<Container text>
			<Header textAlign="center">Register </Header>
			<Form onSubmit={formik.handleSubmit} error={!!resErr}>
				<Form.Field>
					<Form.Input
						error={
							formik.errors.email && formik.touched.email
								? { content: formik.errors.email, pointing: "below" }
								: null
						}
						value={formik.values.email}
						label="Email"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						placeholder="Enter you email"
						name="email"
						type="email"
					/>
				</Form.Field>
				<Form.Field>
					<Form.Input
						error={
							formik.errors.username && formik.touched.username
								? { content: formik.errors.username, pointing: "below" }
								: null
						}
						value={formik.values.username}
						onChange={formik.handleChange}
						name="username"
						label="Username"
						onBlur={formik.handleBlur}
						placeholder="Enter you username"
					/>
				</Form.Field>
				<Form.Field>
					<Form.Input
						error={
							formik.errors.password && formik.touched.password
								? { content: formik.errors.password, pointing: "below" }
								: null
						}
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						placeholder="Password"
						name="password"
						label="Password"
						type="password"
					/>
				</Form.Field>
				<Form.Field>
					<Form.Input
						error={
							formik.errors.password1 && formik.touched.password1
								? { content: formik.errors.password1, pointing: "below" }
								: null
						}
						value={formik.values.password1}
						onChange={formik.handleChange}
						placeholder="Password"
						onBlur={formik.handleBlur}
						name="password1"
						label="Password"
						type="password"
					/>
				</Form.Field>
				<Button primary type="submit">
					Register
				</Button>
				<Link
					to="/login"
					style={{
						marginTop: 8,
						marginLeft: 10,
					}}
				>
					Already a member
				</Link>
				<Message
					error
					header={resErr && resErr.path && resErr.path.toUpperCase()}
					content={resErr && resErr.message}
				/>
			</Form>
			<RegisterSuccessModal open={open} setOpen={setOpen} />
		</Container>
	);
};
export default Register;

import React from "react";
import { useFormik } from "formik";
import { Message, Container, Button, Form, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginSchema from "../formValidations/Login";
import { LOGIN } from "../graphql/User";
import { useMutation } from "@apollo/client";

const Login = ({ history }) => {
	const [login] = useMutation(LOGIN);
	const [resErr, setResErr] = React.useState(null);
	const formik = useFormik({
		initialValues: {
			usernameOrEmail: "",
			password: "",
		},

		onSubmit: async ({ usernameOrEmail, password }) => {
			const {
				data: {
					login: { error },
				},
			} = await login({
				variables: {
					usernameOrEmail,
					password,
				},
			});
			if (error) {
				setResErr(error);
			} else {
				setResErr(null);
				history.push("/group/1");
			}
		},
		validationSchema: LoginSchema,
	});

	return (
		<Container text>
			<Header textAlign="center">Login </Header>
			<Form onSubmit={formik.handleSubmit} error={resErr}>
				<Form.Field>
					<Form.Input
						error={
							formik.errors.usernameOrEmail && formik.touched.usernameOrEmail
								? { content: formik.errors.usernameOrEmail, pointing: "below" }
								: null
						}
						value={formik.values.usernameOrEmail}
						label="Username or Email"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						placeholder="Enter you email/userame"
						name="usernameOrEmail"
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
				<Button primary type="submit">
					Login
				</Button>
				<Link
					to="/register"
					style={{
						marginTop: 8,
						marginLeft: 10,
					}}
				>
					Not a member yet?
				</Link>
				<Message
					error
					header={resErr && resErr.path && resErr.path.toUpperCase()}
					content={resErr && resErr.message}
				/>
			</Form>
		</Container>
	);
};
export default Login;

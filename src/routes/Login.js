import React from "react";
import { useFormik } from "formik";
import { Container, Button, Form, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginSchema from "../formValidations/Login";

const Login = () => {
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: (values) => console.log(values),
		validationSchema: LoginSchema,
	});

	return (
		<Container text>
			<Header textAlign="center">Login </Header>
			<Form onSubmit={formik.handleSubmit}>
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
					Submit
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
			</Form>
		</Container>
	);
};
export default Login;

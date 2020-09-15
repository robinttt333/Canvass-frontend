import React from "react";
import { useFormik } from "formik";
import { Container, Button, Form, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import RegisterSchema from "../formValidations/Register";

const Register = () => {
	const formik = useFormik({
		initialValues: {
			email: "",
			username: "",
			password: "",
			password1: "",
		},
		onSubmit: (values) => console.log(values),
		validationSchema: RegisterSchema,
	});

	return (
		<Container>
			<Header textAlign="center">Register </Header>
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
				<Form.Group>
					<Button type="submit">Submit</Button>
					<Link
						to="/login"
						style={{
							marginTop: 8,
							marginLeft: 10,
						}}
					>
						Already a member?
					</Link>
				</Form.Group>
			</Form>
		</Container>
	);
};
export default Register;

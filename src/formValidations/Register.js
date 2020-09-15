import * as Yup from "yup";
const RegisterSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
	username: Yup.string()
		.matches("^[a-zA-Z]*$", "Username can contain only alphabets")
		.min(5, "Too Short!")
		.max(20, "Too Long!")
		.required("Required"),
	password: Yup.string()
		.min(5, "Password is too short")
		.max(15, "Password is too long")
		.required("Required"),
	password1: Yup.string()
		.min(5, "Password is too short")
		.max(15, "Password is too long")
		.required("Required")
		.oneOf([Yup.ref("password"), null], "Passwords do not match"),
});
export default RegisterSchema;

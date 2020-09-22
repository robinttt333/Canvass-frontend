import * as Yup from "yup";
const PasswordChangeSchema = Yup.object().shape({
	oldPassword: Yup.string().required("Required"),
	password: Yup.string()
		.required("Required")
		.min(5, "Password is too short")
		.max(15, "Password is too long")
		.oneOf([Yup.ref("password1"), null], "Passwords do not match")
		.notOneOf([Yup.ref("oldPassword")], "Passwords cannot be same"),
	password1: Yup.string()
		.min(5, "Password is too short")
		.max(15, "Password is too long")
		.required("Required")
		.oneOf([Yup.ref("password"), null], "Passwords do not match")
		.notOneOf([Yup.ref("oldPassword")], "Passwords cannot be same"),
});
export default PasswordChangeSchema;

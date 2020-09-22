import * as Yup from "yup";
const ProfileSchema = Yup.object().shape({
	firstName: Yup.string().required("Required"),
	lastName: Yup.string().required("Required"),
	status: Yup.string().required("Required"),
	dob: Yup.string().required("Required"),
});
export default ProfileSchema;

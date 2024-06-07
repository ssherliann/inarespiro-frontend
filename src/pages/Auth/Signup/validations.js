import * as yup from "yup";

const validations = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Required field"),
  password: yup
    .string()
    .min(10, "Password must be at least 10 characters")
    .required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Password doesn't match")
    .required(),
});

export default validations;

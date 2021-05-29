import * as yup from "yup";

const registerDto = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email("Wrong email"),
  phone: yup.string().required(),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const loginDto = yup.object().shape({
  email: yup.string().required().email("Wrong email"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

export { registerDto, loginDto };

import { USER } from "types/user";
import * as yup from "yup";

const createUserDto: yup.SchemaOf<USER.CREATE_BODY> = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email("bad email bitch"),
});

const updateUserDto = yup.object().shape({
  firstName: yup.string().trim(),
  lastName: yup.string().trim(),
  email: yup.string().email(),
});

export { createUserDto, updateUserDto };

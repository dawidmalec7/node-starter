import { USER } from "types/user";
import * as yup from "yup";

const updateUserDto = yup.object().shape({
  firstName: yup.string().trim(),
  lastName: yup.string().trim(),
  email: yup.string().email(),
});

export { updateUserDto };

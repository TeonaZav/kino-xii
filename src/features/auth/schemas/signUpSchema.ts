import * as yup from "yup";

import { validators } from "@/src/lib/validation/validators";

export const signUpSchema = yup.object({
  username: validators.username,
  email: validators.email,
  password: validators.password,
  passwordConfirmation: validators.passwordConfirmation,
  avatar: validators.avatar,
});

export type SignUpFormValues = yup.InferType<typeof signUpSchema>;

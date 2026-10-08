import * as yup from "yup";

import { validators } from "@/src/lib/validation/validators";

export const loginSchema = yup.object({
  email: validators.email,
  password: validators.password,
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;

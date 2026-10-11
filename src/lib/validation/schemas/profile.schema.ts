import * as yup from "yup";

import { validators } from "../validators";

export const profileSchema = yup.object({
  fullName: validators.fullName,
  mobileNumber: validators.mobileNumber,
  dateOfBirth: validators.dateOfBirth,
  preferredVenueId: yup.string().defined(),
});

export type ProfileFormValues = yup.InferType<typeof profileSchema>;

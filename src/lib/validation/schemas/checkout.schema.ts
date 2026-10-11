import * as yup from "yup";
import { validators } from "../validators";

export const checkoutSchema = yup.object({
  fullName: validators.fullName,
  email: validators.email,
  mobileNumber: validators.mobileNumber,
  cardNumber: validators.cardNumber,
  expiry: validators.cardExpiry,
  cvv: validators.cvv,
});

export type CheckoutFormValues = yup.InferType<typeof checkoutSchema>;

export const getCheckoutDefaultValues = (
  profile?: {
    fullName?: string | null;
    email?: string | null;
    mobileNumber?: string | null;
  } | null,
): CheckoutFormValues => ({
  fullName: profile?.fullName ?? "",
  email: profile?.email ?? "",
  mobileNumber: profile?.mobileNumber ?? "",
  cardNumber: "",
  expiry: "",
  cvv: "",
});

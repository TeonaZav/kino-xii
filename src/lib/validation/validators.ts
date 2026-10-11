import * as yup from "yup";
import { format, isValid, parseISO } from "date-fns";

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];

const emailValidation = yup
  .string()
  .trim()
  .required("Email is required.")
  .email("Enter a valid email address.");

const passwordValidation = yup
  .string()
  .required("Password is required.")
  .min(3, "Password must be at least 3 characters.");

const usernameValidation = yup
  .string()
  .trim()
  .required("Username is required.")
  .min(3, "Username must be at least 3 characters.");

const passwordConfirmationValidation = yup
  .string()
  .required("Please confirm your password.")
  .oneOf([yup.ref("password")], "Passwords do not match.");

const avatarValidation = yup
  .mixed<File>()
  .nullable()
  .test(
    "file-size",
    "Avatar must be smaller than 2 MB.",
    (file) => !file || file.size <= MAX_AVATAR_SIZE,
  )
  .test(
    "file-type",
    "Avatar must be JPG, PNG or WEBP.",
    (file) => !file || ALLOWED_AVATAR_TYPES.includes(file.type),
  );

const fullNameValidation = yup
  .string()
  .trim()
  .required("Full name is required.")
  .min(3, "Full name must be at least 3 characters.");

const mobileNumberValidation = yup
  .string()
  .required("Mobile number is required.")
  .test("georgian-mobile", "Enter a valid Georgian mobile number.", (value) => {
    if (!value) return false;

    const normalized = value.replace(/[\s()-]/g, "");

    return /^(?:\+995|995)?5\d{8}$/.test(normalized);
  });

const cardNumberValidation = yup
  .string()
  .required("Card number is required.")
  .test("card-number", "Card number must contain 16 digits.", (value) => {
    if (!value) return false;

    return /^\d{16}$/.test(value.replace(/\s/g, ""));
  });

const cardExpiryValidation = yup
  .string()
  .required("Expiry date is required.")
  .test("expiry", "Enter a valid future expiry date (MM/YY).", (value) => {
    if (!value || !/^\d{2}\/\d{2}$/.test(value)) return false;

    const [month, year] = value.split("/").map(Number);

    if (month < 1 || month > 12) return false;

    const now = new Date();
    const expiryYear = 2000 + year;

    return (
      expiryYear > now.getFullYear() ||
      (expiryYear === now.getFullYear() && month >= now.getMonth() + 1)
    );
  });

const cvvValidation = yup
  .string()
  .required("CVV is required.")
  .matches(/^\d{3}$/, "CVV must contain 3 digits.");

const dateOfBirthValidation = yup
  .string()
  .required("Date of birth is required.")
  .test("valid-date", "Enter a valid date of birth.", (value) => {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return false;
    }

    const date = parseISO(value);

    return (
      isValid(date) &&
      format(date, "yyyy-MM-dd") === value &&
      date <= new Date()
    );
  });

export const validators = {
  email: emailValidation,
  password: passwordValidation,
  username: usernameValidation,
  passwordConfirmation: passwordConfirmationValidation,
  avatar: avatarValidation,
  fullName: fullNameValidation,
  mobileNumber: mobileNumberValidation,
  dateOfBirth: dateOfBirthValidation,
  cardNumber: cardNumberValidation,
  cardExpiry: cardExpiryValidation,
  cvv: cvvValidation,
};

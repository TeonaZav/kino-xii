import * as yup from "yup";

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

export const validators = {
  email: emailValidation,
  password: passwordValidation,
  username: usernameValidation,
  passwordConfirmation: passwordConfirmationValidation,
  avatar: avatarValidation,
};

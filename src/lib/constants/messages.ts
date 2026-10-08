export const FEEDBACK_MESSAGES = {
  auth: {
    login: "You have successfully logged in.",
    signup: "Your account has been created successfully.",
    logout: "You have successfully logged out.",
  },
} as const;

export type AuthAction = keyof typeof FEEDBACK_MESSAGES.auth;

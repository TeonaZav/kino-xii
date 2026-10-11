import type { SessionVenue } from "@/src/types/session.types";

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  fullName: string | null;
  mobileNumber: string | null;
  dateOfBirth: string | null;
  age: number | null;
  preferredVenue: SessionVenue | null;
  profileComplete: boolean;
};

export type AuthData = {
  user: AuthUser;
  token: string;
};

export type AuthResponse = {
  data: AuthData;
};

export type ApiErrorResponse = {
  message: string;
};

export type ApiValidationErrorResponse = ApiErrorResponse & {
  errors: Record<string, string[]>;
};

export type AuthModalMode = "login" | "signup" | null;

export type PendingAuthAction = (() => void) | null;

export type GetMeResponse = {
  data: AuthUser;
};

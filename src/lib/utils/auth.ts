import type { AuthUser } from "@/src/types/auth.types";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const getAuthUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;

  const storedUser = localStorage.getItem(AUTH_USER_KEY);

  if (!storedUser) return null;

  try {
    const user: unknown = JSON.parse(storedUser);

    if (
      typeof user !== "object" ||
      user === null ||
      !("id" in user) ||
      !("username" in user)
    ) {
      return null;
    }

    return user as AuthUser;
  } catch {
    return null;
  }
};

export const setAuthUser = (user: AuthUser): void => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

export const removeAuthUser = (): void => {
  localStorage.removeItem(AUTH_USER_KEY);
};

import { isAxiosError } from "axios";

import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

import type {
  ApiErrorResponse,
  ApiValidationErrorResponse,
} from "@/src/types/auth.types";

type AuthFormErrorOptions<T extends FieldValues> = {
  error: unknown;
  setError: UseFormSetError<T>;
  fallbackMessage: string;
  unauthorizedMessage?: string;
};

export const handleAuthFormError = <T extends FieldValues>({
  error,
  setError,
  fallbackMessage,
  unauthorizedMessage,
}: AuthFormErrorOptions<T>) => {
  if (isAxiosError<ApiErrorResponse | ApiValidationErrorResponse>(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 422 && data && "errors" in data) {
      const validationErrors = data.errors;

      if (validationErrors) {
        Object.entries(validationErrors).forEach(([field, messages]) => {
          const message = Array.isArray(messages) ? messages[0] : messages;

          if (typeof message !== "string") return;

          setError(field as Path<T>, {
            type: "server",
            message,
          });
        });

        return;
      }
    }

    setError("root", {
      type: "server",
      message:
        data?.message ??
        (status === 401 && unauthorizedMessage
          ? unauthorizedMessage
          : fallbackMessage),
    });

    return;
  }

  setError("root", {
    type: "server",
    message: fallbackMessage,
  });
};

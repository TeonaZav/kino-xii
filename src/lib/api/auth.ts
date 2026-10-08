import apiClient from "./client";

import type { AuthResponse } from "@/src/types/auth.types";
import type { LoginFormValues } from "@/src/features/auth/schemas/loginSchema";
import type { SignUpFormValues } from "@/src/features/auth/schemas/signUpSchema";

export const login = async (
  payload: LoginFormValues,
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>("/login", payload);

  return data;
};

export const register = async (
  payload: SignUpFormValues,
): Promise<AuthResponse> => {
  const formData = new FormData();

  formData.append("username", payload.username);
  formData.append("email", payload.email);
  formData.append("password", payload.password);
  formData.append("password_confirmation", payload.passwordConfirmation);

  if (payload.avatar) {
    formData.append("avatar", payload.avatar);
  }

  const { data } = await apiClient.post<AuthResponse>("/register", formData);

  return data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post("/logout");
};

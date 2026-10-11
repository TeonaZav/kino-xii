import api from "./client";
import type {
  UserProfile,
  UpdateProfilePayload,
} from "@/src/types/profile.types";

interface ApiResponse<T> {
  data: T;
}

export const getProfile = async (): Promise<UserProfile> => {
  const { data } = await api.get<ApiResponse<UserProfile>>("/me");

  return data.data;
};

export const updateProfile = async (
  payload: UpdateProfilePayload,
): Promise<UserProfile> => {
  const formData = new FormData();

  formData.append("fullName", payload.fullName.trim());
  formData.append("mobileNumber", payload.mobileNumber.replace(/\s/g, ""));
  formData.append("dateOfBirth", payload.dateOfBirth);

  if (payload.preferredVenueId != null) {
    formData.append("preferredVenueId", String(payload.preferredVenueId));
  }

  if (payload.avatar) {
    formData.append("avatar", payload.avatar);
  }

  const { data } = await api.put<ApiResponse<UserProfile>>(
    "/profile",
    formData,
  );

  return data.data;
};

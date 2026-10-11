import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAuth from "@/src/features/auth/hooks/useAuth";

import { updateProfile } from "@/src/lib/api/profile";
import { QUERY_KEYS } from "@/src/lib/constants/queryKeys";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { refreshUser } = useAuth();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: async (updatedProfile) => {
      queryClient.setQueryData(QUERY_KEYS.profile.me, updatedProfile);

      try {
        await refreshUser();
      } catch (error) {
        console.error("Profile saved, but user refresh failed:", error);
      }
    },
  });
};

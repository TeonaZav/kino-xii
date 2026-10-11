import { useQuery } from "@tanstack/react-query";

import { getProfile } from "@/src/lib/api/profile";
import { QUERY_KEYS } from "@/src/lib/constants/queryKeys";

export const useProfile = () => {
  return useQuery({
    queryKey: QUERY_KEYS.profile.me,
    queryFn: getProfile,
    retry: false,
  });
};

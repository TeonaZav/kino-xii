import { useQuery } from "@tanstack/react-query";

import { getSessionFilterOptions } from "@/src/lib/api/sessions";
import { QUERY_KEYS } from "@/src/lib/constants/queryKeys";

export const useSessionFilterOptionsData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.sessions.filterOptions,
    queryFn: getSessionFilterOptions,
  });
};

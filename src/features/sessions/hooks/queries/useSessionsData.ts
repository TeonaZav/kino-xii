import { useQuery } from "@tanstack/react-query";

import { getSessions } from "@/src/lib/api/sessions";
import { QUERY_KEYS } from "@/src/lib/constants/queryKeys";
import type { SessionFilters } from "@/src/types/session.types";

export const useSessionsData = (filters: SessionFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.sessions.list(filters),
    queryFn: () => getSessions(filters),
  });
};

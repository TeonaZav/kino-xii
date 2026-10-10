import { useQuery } from "@tanstack/react-query";

import { getSessionSeats } from "@/src/lib/api/bookings";
import { QUERY_KEYS } from "@/src/lib/constants/queryKeys";

export const useSessionSeats = (sessionId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.booking.sessionSeats(sessionId),
    queryFn: () => getSessionSeats(sessionId),
    enabled: Number.isFinite(sessionId) && sessionId > 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createHold, type CreateHoldPayload } from "@/src/lib/api/bookings";

import { QUERY_KEYS } from "@/src/lib/constants/queryKeys";

export const useCreateHold = (sessionId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateHoldPayload) => createHold(sessionId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.booking.sessionSeats(sessionId),
      });
    },
  });
};

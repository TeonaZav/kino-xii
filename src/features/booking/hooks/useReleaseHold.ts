import { useMutation } from "@tanstack/react-query";

import { releaseHold } from "@/src/lib/api/bookings";

export const useReleaseHold = () => {
  return useMutation({
    mutationFn: (holdId: string) => releaseHold(holdId),
    retry: false,
  });
};
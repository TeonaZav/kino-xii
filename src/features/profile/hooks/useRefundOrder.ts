import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/src/lib/constants/queryKeys";
import { refundOrder } from "@/src/lib/api/tickets";

export const useRefundOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: refundOrder,
    retry: false,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.tickets.all,
      });
    },
  });
};

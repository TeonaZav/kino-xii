import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/src/lib/constants/queryKeys";
import { getTickets } from "@/src/lib/api/tickets";

import type { TicketFilter } from "@/src/types/ticket.types";

export const useTickets = (filter: TicketFilter) => {
  return useQuery({
    queryKey: QUERY_KEYS.tickets.list(filter),
    queryFn: () => getTickets(filter),
  });
};

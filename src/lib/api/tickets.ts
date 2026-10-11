import api from "./client";

import {
  RefundResponse,
  TicketFilter,
  TicketOrder,
  TicketsResponse,
} from "@/src/types/ticket.types";

export const getTickets = async (
  filter: TicketFilter,
): Promise<TicketOrder[]> => {
  const { data } = await api.get<TicketsResponse>("/tickets", {
    params: { filter },
  });

  return data.data;
};

export const refundOrder = async (reference: string): Promise<TicketOrder> => {
  const { data } = await api.post<RefundResponse>(
    `/orders/${encodeURIComponent(reference)}/refund`,
  );

  return data.data;
};

import type { PaidOrder } from "./checkout.types";

export type TicketFilter = "upcoming" | "past";

type TicketSession = Omit<PaidOrder["session"], "movie"> & {
  format: {
    id: number;
    slug: string;
    name: string;
    priceUplift: number;
  };

  language: {
    id: number;
    slug: string;
    name: string;
    code: string;
  };

  movie: PaidOrder["session"]["movie"] & {
    runtimeMinutes: number;

    ageRating: {
      code: string;
      minAge: number;
      description: string;
    };
  };
};

export type TicketOrder = Omit<PaidOrder, "session"> & {
  session: TicketSession;
  isUpcoming: boolean;
  isRefundable: boolean;
  refundedAt: string | null;
};

export type TicketsResponse = {
  data: TicketOrder[];
};

export type RefundResponse = {
  data: TicketOrder;
};

import { Session } from "./session.types";

export type SeatState = "available" | "sold" | "held" | "unavailable";

export type HallSeat = {
  id: number;
  code: string;
  label: string;
  state: SeatState;
  aisleAfter: boolean;
  isMine: boolean;
};

export type HallRow = {
  label: string;
  seats: HallSeat[];
};

export type HallSection = {
  name: string;
  rows: HallRow[];
};

export type SessionSeatMap = {
  sessionId: number;
  hall: {
    id: number;
    name: string;
    venue: {
      id: number;
      slug: string;
      name: string;
      city: string;
    };
  };
  sections: HallSection[];
};

export type TicketTypeSlug = string;

export type BookingTicketType = {
  id: number;
  slug: string;
  name: string;
  priceRatio: number;
  note: string | null;
  blockedFromRatingAge: number | null;
};

export type SelectedBookingSeat = {
  seat: HallSeat;
  ticketTypeSlug: TicketTypeSlug;
};

export type BookingHoldSeat = {
  seatId: number;
  code: string;
  ticketType: {
    slug: string;
    name: string;
  };
  price: number;
};

export type BookingHold = {
  holdId: string;
  sessionId: number;
  expiresAt: string;
  secondsRemaining: number;
  isLive: boolean;
  subtotal: number;
  seats: BookingHoldSeat[];
};

export type TicketSessionInfo = Pick<Session, "date" | "time"> & {
  hall: Pick<Session["hall"], "name">;
  venue: Pick<Session["venue"], "name">;
  format?: Pick<Session["format"], "name">;
  language?: Pick<Session["language"], "name">;
};

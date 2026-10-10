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

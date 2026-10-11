import api from "./client";
import type { SessionSeatMap, BookingHold } from "@/src/types/booking.types";
export interface CreateHoldPayload {
  seats: {
    seatId: number;
    ticketType: string;
  }[];
}
export const getSessionSeats = async (
  sessionId: number,
): Promise<SessionSeatMap> => {
  const { data } = await api.get<{ data: SessionSeatMap }>(
    `/sessions/${sessionId}/seats`,
  );

  return data.data;
};

export const createHold = async (
  sessionId: number,
  payload: CreateHoldPayload,
): Promise<BookingHold> => {
  const { data } = await api.post<{ data: BookingHold }>(
    `/sessions/${sessionId}/holds`,
    payload,
  );

  return data.data;
};

export const getHold = async (holdId: string): Promise<BookingHold> => {
  const { data } = await api.get<{
    data: BookingHold;
  }>(`/holds/${encodeURIComponent(holdId)}`);

  return data.data;
};

export const releaseHold = async (holdId: string): Promise<void> => {
  await api.delete(`/holds/${encodeURIComponent(holdId)}`);
};

import api from "./client";
import type { SessionSeatMap } from "@/src/types/booking.types";

export const getSessionSeats = async (
  sessionId: number,
): Promise<SessionSeatMap> => {
  const { data } = await api.get<{ data: SessionSeatMap }>(
    `/sessions/${sessionId}/seats`,
  );

  return data.data;
};

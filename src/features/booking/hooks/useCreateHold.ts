import { useMutation } from "@tanstack/react-query";

import { createHold } from "@/src/lib/api/bookings";

import type { SelectedBookingSeat } from "@/src/types/booking.types";

interface ICreateHoldVariables {
  sessionId: number;
  selectedSeats: SelectedBookingSeat[];
}

export const useCreateHold = () => {
  return useMutation({
    mutationFn: ({ sessionId, selectedSeats }: ICreateHoldVariables) =>
      createHold(sessionId, {
        seats: selectedSeats.map(({ seat, ticketTypeSlug }) => ({
          seatId: seat.id,
          ticketType: ticketTypeSlug,
        })),
      }),
    retry: false,
  });
};

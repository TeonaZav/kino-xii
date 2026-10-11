"use client";

import { createContext, useContext, type ReactNode } from "react";

import { useBookingSelection } from "../hooks/useBookingSelection";

import type {
  BookingHold,
  BookingTicketType,
  SelectedBookingSeat,
} from "@/src/types/booking.types";

interface BookingProviderProps {
  children: ReactNode;
  sessionId: number;
  sessionDate: string;
  movieId: string;
  userId: string;
  ticketTypes: BookingTicketType[];
  maxSeats: number;
  movieMinAge: number;
  initialHold?: BookingHold | null;
  initialSelectedSeats?: SelectedBookingSeat[];
  onAuthenticationRequired?: () => void;
  onProfileRequired?: () => void;
}

type BookingContextValue = ReturnType<typeof useBookingSelection> & {
  maxSeats: number;
  ticketTypes: BookingTicketType[];
};

const BookingContext = createContext<BookingContextValue | null>(null);

export const BookingProvider = ({
  children,
  maxSeats,
  ticketTypes,
  ...selectionProps
}: BookingProviderProps) => {
  const booking = useBookingSelection({
    ...selectionProps,
    maxSeats,
    ticketTypes,
  });

  return (
    <BookingContext.Provider
      value={{
        ...booking,
        maxSeats,
        ticketTypes,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextValue => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return context;
};

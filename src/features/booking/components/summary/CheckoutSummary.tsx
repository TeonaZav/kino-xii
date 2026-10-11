"use client";

import type { Movie } from "@/src/types/movie.types";
import type { Session } from "@/src/types/session.types";

import { Card } from "@/src/components/ui";
import { useBooking } from "../../context/BookingContext";

import BookingTicketDetails from "../ticket/BookingTicketDetails";
import BookingTicketMovieInfo from "../ticket/BookingTicketMovieInfo";

interface ICheckoutSummaryProps {
  movie: Movie;
  session: Session;
}

const CheckoutSummary = ({ movie, session }: ICheckoutSummaryProps) => {
  const { selectedSeats, availableTicketTypes } = useBooking();

  return (
    <>
      <h4 className="text-sm font-extrabold">Summary</h4>

      <Card className="flex min-h-33.5 flex-col rounded-xl bg-card p-4">
        <BookingTicketMovieInfo
          movie={movie}
          session={session}
          className="border-b border-raised pb-2.5"
        />

        <BookingTicketDetails
          selectedSeats={selectedSeats}
          availableTicketTypes={availableTicketTypes}
        />
      </Card>
    </>
  );
};

export default CheckoutSummary;

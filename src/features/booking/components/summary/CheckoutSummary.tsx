"use client";

import type { Movie } from "@/src/types/movie.types";
import type { Session } from "@/src/types/session.types";
import { Card } from "@/src/components/ui";
import BookingTicketDetails from "../ticket/BookingTicketDetails";
import BookingTicketMovieInfo from "../ticket/BookingTicketMovieInfo";

interface ICheckoutSummaryProps {
  movie: Movie;
  session: Session;
}

const CheckoutSummary = ({ movie, session }: ICheckoutSummaryProps) => {
  return (
    <>
      <h4 className="text-sm font-extrabold">Summary</h4>

      <Card className="flex flex-col rounded-xl bg-card p-4 min-h-33.5">
        <BookingTicketMovieInfo
          movie={movie}
          session={session}
          className="border-b border-raised pb-2.5"
        />
        <BookingTicketDetails />
      </Card>
    </>
  );
};

export default CheckoutSummary;

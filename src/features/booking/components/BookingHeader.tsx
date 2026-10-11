import { formatBookingModalDate } from "@/src/lib/utils/formatDate";
import { useBooking } from "../context/BookingContext";

import HoldTimer from "./checkout/HoldTimer";

import type { Movie } from "@/src/types/movie.types";
import type { Session } from "@/src/types/session.types";

interface IBookingHeaderProps {
  movie: Movie;
  session: Session;
}

const BookingHeader = ({ movie, session }: IBookingHeaderProps) => {
  const { hold, remainingSeconds } = useBooking();

  const formattedBookingModalDate = formatBookingModalDate(session.date);

  const sessionDetails = [
    session.venue.name,
    `Hall ${session.hall.name}`,
    formattedBookingModalDate,
    session.time,
    session.format.name,
    session.language.name,
  ].join(" · ");

  return (
    <header className="flex flex-wrap items-start justify-between gap-6">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h2 className="text-2xl font-bold uppercase text-primary">
          {movie.title}
        </h2>

        <p className="text-sm text-secondary">{sessionDetails}</p>
      </div>

      {hold && <HoldTimer remainingSeconds={remainingSeconds} />}
    </header>
  );
};

export default BookingHeader;

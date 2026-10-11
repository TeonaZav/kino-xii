import cn from "classnames";

import type { Movie } from "@/src/types/movie.types";
import type { Session } from "@/src/types/session.types";
import { TicketSessionDetails } from "@/src/features/shared";

interface IBookingTicketMovieInfoProps {
  movie: Movie;
  session: Session;
  showVenue?: boolean;
  className?: string;
}

const BookingTicketMovieInfo = ({
  movie,
  session,
  showVenue = false,
  className,
}: IBookingTicketMovieInfoProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <h5 className="text-sm font-extrabold uppercase leading-[100%]">
        {movie.title}
      </h5>

      <TicketSessionDetails
        session={session}
        showVenue={showVenue}
        className="text-sm"
      />
    </div>
  );
};

export default BookingTicketMovieInfo;

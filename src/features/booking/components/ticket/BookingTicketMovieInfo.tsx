import cn from "classnames";

import { TicketSessionDetails } from "@/src/features/shared";
import { TicketSessionInfo } from "@/src/types/booking.types";

interface IBookingTicketMovieInfoProps {
  movie: {
    title: string;
  };
  session: TicketSessionInfo;
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
      <h5 className="text-sm leading-none font-extrabold uppercase">
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

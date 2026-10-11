import { Badge } from "@/src/components/ui";
import { formatSessionDate } from "@/src/lib/utils/formatDate";

import type { TicketOrder } from "@/src/types/ticket.types";

import InfoField from "./InfoField";

interface ITicketMovieDetailsProps {
  order: TicketOrder;
}

const TicketMovieDetails = ({ order }: ITicketMovieDetailsProps) => {
  const { session, tickets } = order;
  const { movie, venue, hall } = session;

  const isRefunded = order.status === "refunded";

  return (
    <div className="flex min-w-0 flex-1 gap-4 px-7 py-6">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="h-33.25 w-25 shrink-0 rounded-lg object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-xl font-extrabold text-primary">{movie.title}</h3>

          {movie.ageRating && (
            <Badge variant="danger" className="px-2 py-1">
              {movie.ageRating.code}
            </Badge>
          )}

          <span className="text-sm text-secondary">
            {movie.runtimeMinutes} min
          </span>

          {isRefunded && (
            <span className="rounded-full bg-raised px-2.5 py-1 text-xs text-secondary">
              Refunded
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <InfoField
            label="Date"
            value={formatSessionDate(session.date, session.time)}
          />

          <InfoField
            label="Venue"
            value={`${venue.name} · Hall ${hall.name}`}
          />

          <InfoField
            label="Format"
            value={[session.format.name, session.language?.name]
              .filter(Boolean)
              .join(" · ")}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase text-secondary">
            Seats
          </span>

          {tickets.map((ticket) => (
            <Badge key={ticket.id} className="rounded-md">
              {ticket.seatCode} · {ticket.ticketType.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketMovieDetails;

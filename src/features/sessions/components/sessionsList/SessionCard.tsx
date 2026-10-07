import cn from "classnames";

import { Badge, Card, Icon } from "@/src/components/ui";
import SessionVenue from "@/src/features/shared/SessionVenue";
import type { Session } from "@/src/types/session.types";

interface ISessionCardProps {
  session: Session;
}

const SessionCard = ({ session }: ISessionCardProps) => {
  const { time, format, language, seatsLeft, venue, hall, price, isSoldOut } =
    session;

  const availabilityText = isSoldOut ? "Sold out" : `${seatsLeft} left`;

  const availabilityColor = isSoldOut
    ? "text-secondary"
    : seatsLeft <= 3
      ? "text-red"
      : "text-success";

  return (
    <Card
      as="button"
      disabled={isSoldOut}
      className={cn(
        "session-card-size flex flex-col justify-between gap-2",
        "rounded-2xl p-3.75",
        "disabled:cursor-not-allowed disabled:opacity-40",
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <span className="text-lg leading-none font-extrabold text-primary">
            {time}
          </span>

          <Badge className="uppercase">{format.name}</Badge>
        </div>

        <div className="flex items-center justify-between gap-1">
          <span className="text-xs text-secondary">{language.name}</span>

          <span
            className={cn("flex items-center gap-1 text-xs", availabilityColor)}
          >
            {!isSoldOut && <Icon type="Movie" />}

            {availabilityText}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-3">
        <SessionVenue
          venueName={venue.name}
          hallName={hall.name}
          className="text-xs"
        />

        <span className="shrink-0 text-sm font-extrabold text-primary">
          ₾{price}
        </span>
      </div>
    </Card>
  );
};

export default SessionCard;

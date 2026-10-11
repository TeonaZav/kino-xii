import cn from "classnames";

import { formatBookingModalDate } from "@/src/lib/utils/formatDate";

import type { Session } from "@/src/types/session.types";

interface ITicketSessionDetailsProps {
  session: Session;
  showVenue?: boolean;
  showFormat?: boolean;
  showLanguage?: boolean;
  className?: string;
}

const TicketSessionDetails = ({
  session,
  showVenue = false,
  showFormat = false,
  showLanguage = false,
  className,
}: ITicketSessionDetailsProps) => {
  const formattedDate = formatBookingModalDate(session.date);

  const sessionDetails = [
    showVenue && session.venue.name,
    `Hall ${session.hall.name}`,
    formattedDate,
    session.time,
    showFormat && session.format.name,
    showLanguage && session.language.name,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <p className={cn("text-xs text-secondary", className)}>{sessionDetails}</p>
  );
};

export default TicketSessionDetails;

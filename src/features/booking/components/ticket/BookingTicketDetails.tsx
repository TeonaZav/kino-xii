"use client";

import { useMemo } from "react";
import cn from "classnames";

import { useBooking } from "../../context/BookingContext";

interface IBookingTicketDetailsProps {
  className?: string;
}

const BookingTicketDetails = ({ className }: IBookingTicketDetailsProps) => {
  const { selectedSeats, availableTicketTypes } = useBooking();

  const { seatCodes, ticketSummary } = useMemo(() => {
    const seatCodes = selectedSeats.map(({ seat }) => seat.code).join(", ");

    const ticketCounts = selectedSeats.reduce<Record<string, number>>(
      (acc, { ticketTypeSlug }) => {
        acc[ticketTypeSlug] = (acc[ticketTypeSlug] ?? 0) + 1;
        return acc;
      },
      {},
    );

    const ticketSummary = Object.entries(ticketCounts)
      .map(([slug, count]) => {
        const ticketType = availableTicketTypes.find(
          (type) => type.slug === slug,
        );

        return `${count} x ${ticketType?.name ?? slug}`;
      })
      .join(", ");

    return { seatCodes, ticketSummary };
  }, [selectedSeats, availableTicketTypes]);

  return (
    <div className={cn("flex flex-col gap-2 pt-2.5", className)}>
      <div className="flex items-start justify-between gap-4 text-xs">
        <span className="text-secondary">Seats</span>
        <span className="text-right font-semibold">{seatCodes || "—"}</span>
      </div>

      <div className="flex items-start justify-between gap-4 text-xs">
        <span className="text-secondary">Tickets</span>
        <span className="text-right font-medium">{ticketSummary || "—"}</span>
      </div>
    </div>
  );
};

export default BookingTicketDetails;

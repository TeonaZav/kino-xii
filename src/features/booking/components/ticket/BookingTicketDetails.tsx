"use client";

import { useMemo } from "react";
import cn from "classnames";

import type { PaidOrder } from "@/src/types/checkout.types";
import type { SelectedBookingSeat } from "@/src/types/booking.types";

interface IBookingTicketDetailsProps {
  className?: string;
  selectedSeats?: SelectedBookingSeat[];
  availableTicketTypes?: {
    slug: string;
    name: string;
  }[];
  tickets?: PaidOrder["tickets"];
}

const BookingTicketDetails = ({
  className,
  selectedSeats = [],
  availableTicketTypes = [],
  tickets,
}: IBookingTicketDetailsProps) => {
  const { seatCodes, ticketSummary } = useMemo(() => {
    if (tickets) {
      const seatCodes = tickets.map(({ seatCode }) => seatCode).join(", ");

      const counts = tickets.reduce<Record<string, number>>(
        (acc, { ticketType }) => {
          acc[ticketType.name] = (acc[ticketType.name] ?? 0) + 1;
          return acc;
        },
        {},
      );

      return {
        seatCodes,
        ticketSummary: Object.entries(counts)
          .map(([name, count]) => `${count} x ${name}`)
          .join(", "),
      };
    }

    const seatCodes = selectedSeats.map(({ seat }) => seat.code).join(", ");

    const counts = selectedSeats.reduce<Record<string, number>>(
      (acc, { ticketTypeSlug }) => {
        acc[ticketTypeSlug] = (acc[ticketTypeSlug] ?? 0) + 1;
        return acc;
      },
      {},
    );

    return {
      seatCodes,
      ticketSummary: Object.entries(counts)
        .map(([slug, count]) => {
          const type = availableTicketTypes.find(
            ({ slug: typeSlug }) => typeSlug === slug,
          );

          return `${count} x ${type?.name ?? slug}`;
        })
        .join(", "),
    };
  }, [tickets, selectedSeats, availableTicketTypes]);

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

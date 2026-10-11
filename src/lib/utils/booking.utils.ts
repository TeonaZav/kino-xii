import type {
  HallSection,
  BookingHold,
  SessionSeatMap,
  SelectedBookingSeat,
} from "@/src/types/booking.types";

export const getHallSectionLabel = (section: HallSection): string => {
  const firstRow = section.rows[0]?.label;
  const lastRow = section.rows.at(-1)?.label;

  if (!firstRow) return section.name;

  return `${section.name} · Rows ${firstRow}–${lastRow}`;
};

export const restoreSelectedSeats = (
  hold: BookingHold,
  seatMap: SessionSeatMap,
): SelectedBookingSeat[] => {
  const seats = seatMap.sections.flatMap((section) =>
    section.rows.flatMap((row) => row.seats),
  );

  return hold.seats.flatMap((heldSeat) => {
    const seat = seats.find((item) => item.id === heldSeat.seatId);

    if (!seat) return [];

    return [
      {
        seat,
        ticketTypeSlug: heldSeat.ticketType.slug,
      },
    ];
  });
};

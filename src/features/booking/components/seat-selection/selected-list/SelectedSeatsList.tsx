"use client";

import { useBooking } from "../../../context/BookingContext";
import SelectedSeatListItem from "./SelectedSeatListItem";

const SelectedSeatsList = () => {
  const { selectedSeats } = useBooking();

  if (!selectedSeats.length) return null;

  return (
    <ul className="flex flex-col gap-2">
      {selectedSeats.map((selectedSeat) => (
        <li key={selectedSeat.seat.id}>
          <SelectedSeatListItem selectedSeat={selectedSeat} />
        </li>
      ))}
    </ul>
  );
};

export default SelectedSeatsList;

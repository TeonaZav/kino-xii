"use client";

import { useBooking } from "../../context/BookingContext";
import { AlertMessage } from "@/src/components/ui";
import SelectedSeatsList from "../seat-selection/selected-list/SelectedSeatsList";

const SelectedSeatsSummary = () => {
  const { selectedSeats, maxSeats, bookingError } = useBooking();

  return (
    <>
      <h4 className="text-base font-bold text-primary">
        Your seats · Max {maxSeats}
      </h4>

      {!selectedSeats.length && (
        <p className="text-sm text-secondary">
          Pick up to {maxSeats} seats from the map. Each seat can carry its own
          ticket type.
        </p>
      )}

      <SelectedSeatsList />

      {bookingError && (
        <AlertMessage variant="error">{bookingError}</AlertMessage>
      )}
    </>
  );
};

export default SelectedSeatsSummary;

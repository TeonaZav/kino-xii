import cn from "classnames";

import { useBooking } from "../../../context/BookingContext";
import type { HallSeat } from "@/src/types/booking.types";

interface ISeatProps {
  seat: HallSeat;
}

const Seat = ({ seat }: ISeatProps) => {
  const { selectedSeats, handleSeatSelect } = useBooking();

  const isSelected = selectedSeats.some((item) => item.seat.id === seat.id);

  const visualState = isSelected ? "selected" : seat.state;

  const isDisabled = !isSelected && seat.state !== "available";

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-label={`Seat ${seat.code}, ${visualState}`}
      aria-pressed={isSelected}
      onClick={() => handleSeatSelect(seat)}
      className={cn(
        "flex size-13 shrink-0 items-center justify-center rounded-[10px]",
        "border text-sm font-semibold transition-colors",
        {
          "cursor-pointer border-disabled bg-card text-primary hover:border-primary":
            visualState === "available",

          "cursor-pointer border-red bg-red text-white":
            visualState === "selected",

          "cursor-not-allowed border-transparent text-secondary seat-held":
            visualState === "held",

          "cursor-not-allowed border-transparent bg-card text-disabled":
            visualState === "unavailable" || visualState === "sold",
        },
      )}
    >
      {seat.label}
    </button>
  );
};

export default Seat;

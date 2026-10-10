import cn from "classnames";

import type { HallSeat } from "@/src/types/booking.types";

interface ISeatProps {
  seat: HallSeat;
  isSelected: boolean;
  onSelect: (seat: HallSeat) => void;
}

const Seat = ({ seat, isSelected, onSelect }: ISeatProps) => {
  const isDisabled = seat.state !== "available";

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-label={`Seat ${seat.code}, ${seat.state}`}
      aria-pressed={isSelected}
      onClick={() => onSelect(seat)}
      className={cn(
        "flex size-13 shrink-0 items-center justify-center rounded-[10px]",
        "border text-sm font-semibold transition-colors",
        {
          "cursor-pointer border-disabled bg-card": !isDisabled && !isSelected,

          "cursor-pointer border-red bg-red": isSelected,

          "cursor-not-allowed border-transparent text-secondary seat-held":
            seat.state === "held",

          "cursor-not-allowed border-transparent  bg-card text-disabled":
            seat.state === "unavailable" || seat.state === "sold",
        },
      )}
    >
      {seat.label}
    </button>
  );
};

export default Seat;

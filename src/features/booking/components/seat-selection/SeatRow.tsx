import type { HallRow, HallSeat } from "@/src/types/booking.types";
import Seat from "./Seat";

interface ISeatRowProps {
  row: HallRow;
  selectedSeatIds: number[];
  onSeatSelect: (seat: HallSeat) => void;
}

const SeatRow = ({ row, selectedSeatIds, onSeatSelect }: ISeatRowProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0 text-center text-xs font-semibold">
        {row.label}
      </span>

      <div className="flex items-center gap-2">
        {row.seats.map((seat) => (
          <div key={seat.id} className={seat.aisleAfter ? "mr-8" : ""}>
            <Seat
              seat={seat}
              isSelected={selectedSeatIds.includes(seat.id)}
              onSelect={onSeatSelect}
            />
          </div>
        ))}
      </div>

      <span className="w-5 shrink-0 text-center text-xs text-secondary">
        {row.label}
      </span>
    </div>
  );
};

export default SeatRow;

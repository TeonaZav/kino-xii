import Seat from "./Seat";
import type { HallRow } from "@/src/types/booking.types";
interface ISeatRowProps {
  row: HallRow;
}

const SeatRow = ({ row }: ISeatRowProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0 text-center text-xs font-semibold">
        {row.label}
      </span>

      <div className="flex items-center gap-2">
        {row.seats.map((seat) => (
          <div key={seat.id} className={seat.aisleAfter ? "mr-8" : ""}>
            <Seat seat={seat} />
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

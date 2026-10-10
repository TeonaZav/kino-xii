import type {
  HallSection as HallSectionType,
  HallSeat,
  HallSection,
} from "@/src/types/booking.types";

import SeatRow from "./SeatRow";
import { getHallSectionLabel } from "@/src/lib/utils/booking.utils";

interface IHallSectionProps {
  section: HallSectionType;
  selectedSeatIds: number[];
  onSeatSelect: (seat: HallSeat) => void;
}

const HallSection = ({
  section,
  selectedSeatIds,
  onSeatSelect,
}: IHallSectionProps) => {
  console.log(section);


  return (
    <section className="flex flex-col items-center gap-6">
      <h3 className="text-xs font-semibold uppercase text-secondary self-start">
        {getHallSectionLabel(section)}
      </h3>

      <div className="flex flex-col gap-2">
        {section.rows.map((row) => (
          <SeatRow
            key={row.label}
            row={row}
            selectedSeatIds={selectedSeatIds}
            onSeatSelect={onSeatSelect}
          />
        ))}
      </div>
    </section>
  );
};

export default HallSection;

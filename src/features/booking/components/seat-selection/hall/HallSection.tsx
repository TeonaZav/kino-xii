import SeatRow from "./SeatRow";
import type { HallSection as HallSectionType } from "@/src/types/booking.types";
import { getHallSectionLabel } from "@/src/lib/utils/booking.utils";
interface IHallSectionProps {
  section: HallSectionType;
}

const HallSection = ({ section }: IHallSectionProps) => {
  return (
    <section className="flex flex-col items-center gap-6">
      <h3 className="self-start text-xs font-semibold uppercase text-secondary">
        {getHallSectionLabel(section)}
      </h3>

      <div className="flex flex-col gap-2">
        {section.rows.map((row) => (
          <SeatRow key={row.label} row={row} />
        ))}
      </div>
    </section>
  );
};

export default HallSection;

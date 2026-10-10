import type { SessionSeatMap, HallSeat } from "@/src/types/booking.types";

import HallSection from "./HallSection";
import SeatLegend from "./SeatLegend";

interface IHallMapProps {
  seatMap: SessionSeatMap;
  selectedSeatIds: number[];
  onSeatSelect: (seat: HallSeat) => void;
}

const HallMap = ({ seatMap, selectedSeatIds, onSeatSelect }: IHallMapProps) => {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex h-7.5 items-center justify-center rounded-b-full bg-raised text-xs font-semibold tracking-wide uppercase">
        Screen
      </div>

      <div className="w-full overflow-x-auto pb-4">
        <div className="flex min-w-max flex-col items-center gap-8">
          {seatMap.sections.map((section, index) => (
            <HallSection
              key={`${section.name}-${index}`}
              section={section}
              selectedSeatIds={selectedSeatIds}
              onSeatSelect={onSeatSelect}
            />
          ))}
        </div>
      </div>

      <SeatLegend />
    </div>
  );
};

export default HallMap;

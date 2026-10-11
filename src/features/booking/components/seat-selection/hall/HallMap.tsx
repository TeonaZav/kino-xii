import { useBooking } from "../../../context/BookingContext";
import HallSection from "./HallSection";
import SeatLegend from "./SeatLegend";

const HallMap = () => {
  const { seatMap } = useBooking();

  if (!seatMap) return null;

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex h-7.5 items-center justify-center rounded-b-full bg-raised text-xs font-semibold tracking-wide uppercase">
        Screen
      </div>

      <div className="w-full overflow-x-auto pb-4">
        <div className="flex min-w-max flex-col items-center gap-8">
          {seatMap.sections.map((section, index) => (
            <HallSection key={`${section.name}-${index}`} section={section} />
          ))}
        </div>
      </div>

      <SeatLegend />
    </div>
  );
};

export default HallMap;

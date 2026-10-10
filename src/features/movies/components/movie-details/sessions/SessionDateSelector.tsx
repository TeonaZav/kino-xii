import cn from "classnames";

import { SectionHeading, Slider } from "@/src/components/ui";
import { SessionDateButton } from "@/src/features/shared";

type SessionDate = {
  day: string;
  date: number;
  value: string;
};

interface ISessionDateSelectorProps {
  dates: SessionDate[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

const SessionDateSelector = ({
  dates,
  selectedDate,
  onDateSelect,
}: ISessionDateSelectorProps) => {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <SectionHeading className="text-xl">Sessions</SectionHeading>
      <Slider
        items={dates}
        getKey={(item) => item.value}
        slidesPerView="auto"
        spaceBetween={6}
        getSlideClassName={(item) =>
          cn(
            "transition-all duration-300 ease-out",
            selectedDate === item.value ? "w-27.25!" : "w-20!",
          )
        }
        renderItem={(item) => (
          <SessionDateButton
            day={item.day}
            date={item.date}
            value={item.value}
            isSelected={selectedDate === item.value}
            onSelect={onDateSelect}
          />
        )}
      />
    </div>
  );
};

export default SessionDateSelector;

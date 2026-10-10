import cn from "classnames";

import { Icon } from "@/src/components/ui";

interface ISessionAvailabilityProps {
  isSoldOut: boolean;
  seatsLeft: number | string;
  availabilityColor?: string;
  className?: string;
}

const SessionAvailability = ({
  isSoldOut,
  seatsLeft,
  availabilityColor = "text-secondary",
  className,
}: ISessionAvailabilityProps) => {
  const availabilityText = isSoldOut ? "Sold out" : `${seatsLeft} left`;
  return (
    <span
      className={cn(
        "flex items-center gap-1 text-xs",
        availabilityColor,
        className,
      )}
    >
      {!isSoldOut && <Icon type="Movie" className="size-3" />}

      {availabilityText}
    </span>
  );
};

export default SessionAvailability;

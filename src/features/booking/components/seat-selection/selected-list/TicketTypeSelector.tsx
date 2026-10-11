"use client";

import cn from "classnames";
import { Button } from "@/src/components/ui";
import { useBooking } from "../../../context/BookingContext";

interface ITicketTypeSelectorProps {
  seatId: number;
  ticketTypeSlug: string;
}

const TicketTypeSelector = ({
  seatId,
  ticketTypeSlug,
}: ITicketTypeSelectorProps) => {
  const {
    availableTicketTypes,
    handleTicketTypeChange,
    activeStep,
    isUpdatingHold,
    isCancelling,
  } = useBooking();

  const isDisabled =
    activeStep === "checkout" || isUpdatingHold || isCancelling;

  return (
    <div className="grid grid-cols-3 gap-2 pt-3">
      {availableTicketTypes.map((type) => {
        const isSelected = type.slug === ticketTypeSlug;

        return (
          <Button
            key={type.id}
            type="button"
            variant={isSelected ? "primary" : "light"}
            disabled={isDisabled}
            onClick={() => handleTicketTypeChange(seatId, type.slug)}
            title={type.note ?? undefined}
            aria-pressed={isSelected}
            className={cn(
              "px-2! py-2! 2xl:text-[10px]!",
              "transition-colors",
              isSelected
                ? "bg-red! text-white!"
                : "bg-raised! text-secondary! hover:text-primary!",
              "disabled:cursor-default! disabled:opacity-50",
            )}
          >
            {type.name} {Math.round(type.priceRatio * 100)}%
          </Button>
        );
      })}
    </div>
  );
};

export default TicketTypeSelector;

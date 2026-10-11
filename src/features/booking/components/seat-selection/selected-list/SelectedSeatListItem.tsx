"use client";

import { useBooking } from "../../../context/BookingContext";
import { Card, Icon } from "@/src/components/ui";
import TicketTypeSelector from "./TicketTypeSelector";
import type { SelectedBookingSeat } from "@/src/types/booking.types";

interface ISelectedSeatCardProps {
  selectedSeat: SelectedBookingSeat;
}

const formatPrice = (price: number): string =>
  Number.isFinite(price) ? `₾${price.toFixed(2)}` : "—";

const SelectedSeatListItem = ({ selectedSeat }: ISelectedSeatCardProps) => {
  const {
    getSeatPrice,
    handleRemoveSeat,
    isUpdatingHold,
    isCancelling,
    activeStep,
  } = useBooking();

  const { seat, ticketTypeSlug } = selectedSeat;

  const price = getSeatPrice(selectedSeat);
  const isCheckout = activeStep === "checkout";
  const isSubmitting = isUpdatingHold || isCancelling;

  return (
    <Card as="li" className="flex flex-col rounded-2xl p-3.75 w-80.2 h-25.75">
      <div className="w-full flex items-center gap-3 justify-between pb-3 border-b border-raised">
        <div className="text-xs flex items-center gap-3">
          <span className="text-secondary">Seat</span>
          <span className="text-semibold">{seat.code}</span>
        </div>

        <div className="text-xs inline-flex items-center gap-3">
          <span className="font-semibold text-primary">
            {formatPrice(price)}
          </span>
          {!isCheckout && (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleRemoveSeat(seat.id)}
              aria-label={`Remove seat ${seat.code}`}
              className="text-secondary transition-all hover:text-primary disabled:opacity-50 cursor-pointer"
            >
              <Icon type="Close" className="size-2!" />
            </button>
          )}
        </div>
      </div>

      <TicketTypeSelector seatId={seat.id} ticketTypeSlug={ticketTypeSlug} />
    </Card>
  );
};

export default SelectedSeatListItem;

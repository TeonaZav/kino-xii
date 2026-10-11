"use client";

import { Button } from "@/src/components/ui";
import { useBooking } from "../../context/BookingContext";

interface IOrderSummaryProps {
  canSubmit: boolean;
  isPending: boolean;
  isBusy: boolean;
  onBack: () => void;
}

const OrderSummary = ({
  canSubmit,
  isPending,
  isBusy,
  onBack,
}: IOrderSummaryProps) => {
  const { selectedSeats, hold, subtotal } = useBooking();

  return (
    <aside className="flex h-fit flex-col gap-5 rounded-xl bg-card p-5">
      <h3 className="text-base font-semibold text-primary">Order summary</h3>

      <div className="flex flex-col gap-3">
        {selectedSeats.map(({ seat, ticketTypeSlug }) => {
          const heldSeat = hold?.seats.find((item) => item.seatId === seat.id);

          return (
            <div
              key={seat.id}
              className="flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-primary">{seat.code}</span>

                <span className="capitalize text-secondary">
                  {ticketTypeSlug}
                </span>
              </div>

              <span className="font-semibold text-primary">
                ₾{heldSeat?.price ?? 0}
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-disabled/30" />

      <div className="flex items-center justify-between">
        <span className="text-sm text-secondary">Subtotal</span>

        <span className="text-lg font-bold text-primary">
          ₾{hold?.subtotal ?? subtotal}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          variant="primary"
          disabled={!canSubmit}
          className="w-full"
        >
          {isPending ? "Processing..." : "Pay: Complete order"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isBusy}
          className="w-full"
        >
          Back to seats
        </Button>
      </div>
    </aside>
  );
};

export default OrderSummary;

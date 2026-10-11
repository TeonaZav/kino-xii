"use client";

import { useBooking } from "../../context/BookingContext";
import { Button } from "@/src/components/ui";

const formatPrice = (price: number): string =>
  Number.isFinite(price)
    ? price.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })
    : "0";

const BookingSummaryFooter = () => {
  const {
    selectedSeats,
    subtotal,
    activeStep,
    isUpdatingHold,
    isCancelling,
    handleNext,
  } = useBooking();

  const isCheckout = activeStep === "checkout";
  const isSubmitting = isUpdatingHold || isCancelling;

  const isDisabled =
    !selectedSeats.length || isSubmitting || !Number.isFinite(subtotal);

  return (
    <div className="mt-auto flex flex-col gap-4 pt-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase text-primary">
          Subtotal
        </span>

        <span className="text-2xl font-bold text-primary">
          ₾{formatPrice(subtotal)}
        </span>
      </div>

      {isCheckout ? (
        <Button disabled>Pay: Complete order</Button>
      ) : (
        <Button
          onClick={handleNext}
          disabled={isDisabled}
          isLoading={isSubmitting}
        >
          Next: Checkout
        </Button>
      )}
    </div>
  );
};

export default BookingSummaryFooter;

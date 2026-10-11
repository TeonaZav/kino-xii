"use client";

import { useFormContext } from "react-hook-form";

import { useBooking } from "../../context/BookingContext";
import { Button } from "@/src/components/ui";

import type { CheckoutFormValues } from "@/src/lib/validation/schemas/checkout.schema";
import { formatPrice } from "@/src/lib/utils/formatPrice";

const BookingSummaryFooter = () => {
  const {
    selectedSeats,
    subtotal,
    activeStep,
    hold,
    remainingSeconds,
    isUpdatingHold,
    isCancelling,
    handleNext,
  } = useBooking();

  const {
    formState: { isValid, isSubmitting },
  } = useFormContext<CheckoutFormValues>();

  const isCheckout = activeStep === "checkout";
  const isBusy = isUpdatingHold || isCancelling;

  const isNextDisabled =
    !selectedSeats.length || isBusy || !Number.isFinite(subtotal);

  const canPay =
    Boolean(hold?.isLive) &&
    remainingSeconds > 0 &&
    isValid &&
    !isSubmitting &&
    !isBusy;

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
        <Button
          type="submit"
          form="booking-checkout-form"
          disabled={!canPay}
          isLoading={isSubmitting}
        >
          Pay: Complete order
        </Button>
      ) : (
        <Button
          type="button"
          onClick={handleNext}
          disabled={isNextDisabled}
          isLoading={isBusy}
        >
          Next: Checkout
        </Button>
      )}
    </div>
  );
};

export default BookingSummaryFooter;

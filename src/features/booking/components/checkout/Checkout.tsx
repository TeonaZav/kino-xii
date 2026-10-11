"use client";

import { useFormContext } from "react-hook-form";

import { useBooking } from "../../context/BookingContext";
import { useCreateOrder } from "../../hooks/useCreateOrder";

import CheckoutCardFields from "./CheckoutCardFields";
import CheckoutContactFields from "./CheckoutContactFields";

import type { PaidOrder } from "@/src/types/checkout.types";
import type { CheckoutFormValues } from "@/src/lib/validation/schemas/checkout.schema";

interface ICheckoutProps {
  onSuccess: (order: PaidOrder) => void;
  onUnauthorized: () => void;
  onHoldExpired: (message: string) => void;
  onConflict: (message: string, contested: string[]) => void;
}

const Checkout = ({
  onSuccess,
  onUnauthorized,
  onHoldExpired,
  onConflict,
}: ICheckoutProps) => {
  const { hold, isUpdatingHold, isCancelling } = useBooking();

  const { handleSubmit, setError } = useFormContext<CheckoutFormValues>();

  const { onSubmit, formError } = useCreateOrder({
    holdId: hold?.holdId ?? "",
    setError,
    onSuccess,
    onUnauthorized,
    onHoldExpired,
    onConflict,
  });

  const isBusy = isUpdatingHold || isCancelling;

  return (
    <form
      id="booking-checkout-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex min-w-0 flex-col gap-6 p-6"
    >
      <CheckoutContactFields disabled={isBusy} />

      <div className="border-t border-disabled/30" />

      <CheckoutCardFields disabled={isBusy} />

      {formError && (
        <p role="alert" className="text-xs font-medium text-error">
          {formError}
        </p>
      )}
    </form>
  );
};

export default Checkout;

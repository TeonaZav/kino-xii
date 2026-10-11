"use client";

import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBookingModalContent } from "../hooks/useBookingModalContent";
import { useBooking } from "../context/BookingContext";

import BookingSteps from "./BookingSteps";
import BookingHeader from "./BookingHeader";

import BookingSeatSelection from "./seat-selection/BookingSeatSelection";
import Checkout from "./checkout/Checkout";
import CheckoutConfirmation from "./checkout/CheckoutConfirmation";

import BookingSummaryPanel from "./summary/BookingSummaryPanel";
import SelectedSeatsSummary from "./summary/SelectedSeatsSummary";
import CheckoutSummary from "./summary/CheckoutSummary";
import BookingSummaryFooter from "./summary/BookingSummaryFooter";

import type { Movie } from "@/src/types/movie.types";
import type { Session } from "@/src/types/session.types";
import type { PaidOrder } from "@/src/types/checkout.types";
import {
  checkoutSchema,
  getCheckoutDefaultValues,
  type CheckoutFormValues,
} from "@/src/lib/validation/schemas/checkout.schema";
import { useProfile } from "../../profile/hooks/useProfile";

interface IBookingModalContentProps {
  movie: Movie;
  session: Session;
  onClose: () => void;
  registerCancel: (handler: (() => Promise<void>) | null) => void;
  onUnauthorized: () => void;
  onViewTickets?: () => void;
}

const BookingModalContent = ({
  movie,
  session,
  onClose,
  registerCancel,
  onUnauthorized,
  onViewTickets,
}: IBookingModalContentProps) => {
  const [confirmedOrder, setConfirmedOrder] = useState<PaidOrder | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const { handleBack, releaseCurrentHold, refetch } = useBooking();

  const { activeStep, isBusy, isClosing, isCancelling, handleCancel } =
    useBookingModalContent({
      onClose,
      registerCancel,
    });

  const { data: profile } = useProfile();

  const methods = useForm<CheckoutFormValues>({
    resolver: yupResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: getCheckoutDefaultValues(profile),
  });

  const { reset, trigger } = methods;

  useEffect(() => {
    if (!profile) return;

    reset(getCheckoutDefaultValues(profile), {
      keepDirtyValues: true,
    });

    void trigger(["fullName", "email", "mobileNumber"]);
  }, [
    profile?.fullName,
    profile?.email,
    profile?.mobileNumber,
    reset,
    trigger,
  ]);

  const handleHoldExpired = useCallback(
    (message: string) => {
      setCheckoutError(message);
      handleBack();

      void releaseCurrentHold();
    },
    [handleBack, releaseCurrentHold],
  );

  const handleConflict = useCallback(
    (message: string, contested: string[]) => {
      setCheckoutError(
        contested.length > 0
          ? `${message} Unavailable seats: ${contested.join(", ")}`
          : message,
      );

      handleBack();
      void refetch();
    },
    [handleBack, refetch],
  );

  const handleOrderSuccess = useCallback((order: PaidOrder) => {
    setCheckoutError(null);
    setConfirmedOrder(order);
  }, []);

  useEffect(() => {
    if (confirmedOrder) {
      registerCancel(null);
    }
  }, [confirmedOrder, registerCancel]);

  if (confirmedOrder) {
    return (
      <CheckoutConfirmation
        order={confirmedOrder}
        onViewTickets={onViewTickets}
        onClose={onClose}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-6">
        <BookingHeader
          movie={movie}
          session={session}
          onClose={onClose}
          onCancel={handleCancel}
          isBusy={isBusy}
          isCancelling={isCancelling || isClosing}
        />

        {checkoutError && (
          <div
            role="alert"
            className="rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error"
          >
            {checkoutError}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_341px]">
          <div className="flex min-w-0 flex-col gap-6">
            <BookingSteps />

            {activeStep === "seats" ? (
              <BookingSeatSelection isBusy={isBusy} />
            ) : (
              <Checkout
                onSuccess={handleOrderSuccess}
                onUnauthorized={onUnauthorized}
                onHoldExpired={handleHoldExpired}
                onConflict={handleConflict}
              />
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            <BookingSummaryPanel>
              {activeStep === "seats" ? (
                <SelectedSeatsSummary />
              ) : (
                <CheckoutSummary movie={movie} session={session} />
              )}

              <BookingSummaryFooter />
            </BookingSummaryPanel>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default BookingModalContent;

"use client";

import { useBookingModalContent } from "../hooks/useBookingModalContent";

import BookingSteps from "./BookingSteps";
import BookingHeader from "./BookingHeader";

import BookingSeatSelection from "./seat-selection/BookingSeatSelection";
import Checkout from "./checkout/Checkout";

import BookingSummaryPanel from "./summary/BookingSummaryPanel";
import SelectedSeatsSummary from "./summary/SelectedSeatsSummary";
import CheckoutSummary from "./summary/CheckoutSummary";
import BookingSummaryFooter from "./summary/BookingSummaryFooter";

import type { Movie } from "@/src/types/movie.types";
import type { Session } from "@/src/types/session.types";

interface IBookingModalContentProps {
  movie: Movie;
  session: Session;
  onClose: () => void;
  registerCancel: (handler: (() => Promise<void>) | null) => void;
}

const BookingModalContent = ({
  movie,
  session,
  onClose,
  registerCancel,
}: IBookingModalContentProps) => {
  const { activeStep, isBusy, isClosing, isCancelling, handleCancel } =
    useBookingModalContent({
      onClose,
      registerCancel,
    });

  return (
    <div className="flex flex-col gap-6">
      <BookingHeader
        movie={movie}
        session={session}
        onClose={onClose}
        onCancel={handleCancel}
        isBusy={isBusy}
        isCancelling={isCancelling || isClosing}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_341px]">
        <div className="flex min-w-0 flex-col gap-6">
          <BookingSteps />

          {activeStep === "seats" ? (
            <BookingSeatSelection isBusy={isBusy} />
          ) : (
            <Checkout />
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
  );
};

export default BookingModalContent;

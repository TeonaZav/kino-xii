"use client";

import { useState } from "react";

import { useBooking } from "../context/BookingContext";
import HoldTimer from "./HoldTimer";
import CancelBookingDialog from "./CancelBookingDialog";
import { Icon } from "@/src/components/ui";
import type { Movie } from "@/src/types/movie.types";
import type { Session } from "@/src/types/session.types";
import { TicketSessionDetails } from "../../shared";
interface IBookingHeaderProps {
  movie: Movie;
  session: Session;
  onClose: () => void;
  onCancel: () => Promise<void>;
  isBusy: boolean;
  isCancelling: boolean;
}

const BookingHeader = ({
  movie,
  session,
  onCancel,
  isBusy,
  isCancelling,
  onClose,
}: IBookingHeaderProps) => {
  const { hold, remainingSeconds } = useBooking();

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const handleConfirmCancel = async () => {
    await onCancel();
  };

  const handleCloseClick = () => {
    if (!hold?.isLive) {
      onClose();
      return;
    }

    setIsCancelDialogOpen(true);
  };

  return (
    <>
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h2 className="text-2xl font-bold uppercase text-primary">
            {movie.title}
          </h2>

          <TicketSessionDetails
            session={session}
            showVenue
            showFormat
            showLanguage
            className="text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          {hold && <HoldTimer remainingSeconds={remainingSeconds} />}

          <button
            type="button"
            aria-label="Close booking"
            onClick={handleCloseClick}
            disabled={isBusy}
            className="flex size-8 shrink-0 items-center justify-center text-secondary transition-colors hover:bg-raised hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon type="Close" className="size-4" />
          </button>
        </div>
      </header>

      <CancelBookingDialog
        open={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={() => void handleConfirmCancel()}
        isLoading={isCancelling}
      />
    </>
  );
};

export default BookingHeader;

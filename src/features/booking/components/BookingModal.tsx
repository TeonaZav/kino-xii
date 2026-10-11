"use client";

import { useCallback, useRef } from "react";

import { useBookingModal } from "../hooks/useBookingModal";
import { BookingModalSkeleton, Modal } from "@/src/components/ui";
import { BookingProvider } from "../context/BookingContext";

import BookingModalContent from "./BookingModalContent";
import BookingErrorState from "./BookingErrorState";

import type { Movie } from "@/src/types/movie.types";
import type { Session } from "@/src/types/session.types";
import type { BookingHold } from "@/src/types/booking.types";

interface IBookingModalProps {
  movie: Movie;
  session: Session;
  onClose: () => void;
  initialHold?: BookingHold | null;
  onAuthenticationRequired?: () => void;
  onProfileRequired?: () => void;
  onViewTickets?: () => void;
}

const BookingModal = ({
  movie,
  session,
  onClose,
  initialHold = null,
  onAuthenticationRequired,
  onProfileRequired,
  onViewTickets,
}: IBookingModalProps) => {
  const cancelRef = useRef<(() => Promise<void>) | null>(null);

  const {
    user,
    openLogin,
    isLoading,
    isError,
    handleRetry,
    ...bookingOptions
  } = useBookingModal({
    sessionId: session.id,
    initialHold,
  });

  const registerCancel = useCallback(
    (handler: (() => Promise<void>) | null) => {
      cancelRef.current = handler;
    },
    [],
  );

  const handleModalClose = useCallback(() => {
    if (cancelRef.current) {
      void cancelRef.current();
      return;
    }

    onClose();
  }, [onClose]);

  const bookingProps = {
    ...bookingOptions,
    sessionId: session.id,
    sessionDate: session.date,
    movieId: String(movie.id),
    userId: user ? String(user.id) : "",
    movieMinAge: movie.ageRating.minAge,
    initialHold,
    onAuthenticationRequired: onAuthenticationRequired ?? openLogin,
    onProfileRequired,
  };

  return (
    <Modal
      open
      onClose={handleModalClose}
      size="xl"
      className="w-[calc(100vw-32px)]! max-w-360!"
      contentClassName="py-6!"
    >
      {isLoading ? (
        <BookingModalSkeleton />
      ) : isError ? (
        <BookingErrorState onRetry={handleRetry} />
      ) : (
        <BookingProvider
          key={`${session.id}-${initialHold?.holdId ?? "new"}`}
          {...bookingProps}
        >
          <BookingModalContent
            movie={movie}
            session={session}
            onClose={onClose}
            registerCancel={registerCancel}
            onUnauthorized={onAuthenticationRequired ?? openLogin}
            onViewTickets={onViewTickets}
          />
        </BookingProvider>
      )}
    </Modal>
  );
};

export default BookingModal;

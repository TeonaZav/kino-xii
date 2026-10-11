"use client";

import { useState } from "react";

import { useSessionSeats } from "./useSessionSeats";
import { useBookingHold } from "./useBookingHold";
import { getRemainingSeconds } from "@/src/lib/utils/formatTime";
import type {
  BookingHold,
  BookingTicketType,
  HallSeat,
  SelectedBookingSeat,
} from "@/src/types/booking.types";

type BookingStep = "seats" | "checkout";

interface IUseBookingSelectionProps {
  sessionId: number;
  sessionDate: string;
  movieId: string;
  userId: string;
  ticketTypes: BookingTicketType[];
  maxSeats: number;
  movieMinAge: number;
  onAuthenticationRequired?: () => void;
  onProfileRequired?: () => void;
  initialHold?: BookingHold | null;
  initialSelectedSeats?: SelectedBookingSeat[];
}

export const useBookingSelection = ({
  sessionId,
  sessionDate,
  movieId,
  userId,
  ticketTypes = [],
  maxSeats,
  movieMinAge,
  onAuthenticationRequired,
  onProfileRequired,
  initialHold = null,
  initialSelectedSeats = [],
}: IUseBookingSelectionProps) => {
  const [activeStep, setActiveStep] = useState<BookingStep>("seats");

  const {
    data: seatMap,
    isLoading,
    isError,
    refetch,
  } = useSessionSeats(sessionId);

  const {
    selectedSeats,
    hold,
    bookingError,
    setBookingError,

    isUpdatingHold,
    isCancelling,
    isBusy,

    expiresAt,
    remainingSeconds,

    updateSelection,
    expireBooking,
    releaseCurrentHold,
    handleCancelBooking,
  } = useBookingHold({
    sessionId,
    sessionDate,
    movieId,
    userId,
    initialHold,
    initialSelectedSeats,
    isSeatStep: activeStep === "seats",
    refetchSeats: refetch,
    onAuthenticationRequired,
    onProfileRequired,
  });

  const availableTicketTypes = ticketTypes.filter(
    (type) =>
      type.blockedFromRatingAge == null ||
      movieMinAge < type.blockedFromRatingAge,
  );

  const adultTicketType = availableTicketTypes.find(
    (type) => type.slug === "adult",
  );

  const getSeatPrice = (selectedSeat: SelectedBookingSeat): number =>
    hold?.seats.find((item) => item.seatId === selectedSeat.seat.id)?.price ??
    Number.NaN;

  const subtotal = hold?.subtotal ?? Number.NaN;

  const handleSeatSelect = (seat: HallSeat) => {
    if (isBusy() || activeStep !== "seats") return;

    const isSelected = selectedSeats.some((item) => item.seat.id === seat.id);

    if (isSelected) {
      updateSelection(selectedSeats.filter((item) => item.seat.id !== seat.id));
      return;
    }

    if (seat.state !== "available") return;

    if (selectedSeats.length >= maxSeats) {
      setBookingError(`You can select up to ${maxSeats} seats.`);
      return;
    }

    if (!adultTicketType) {
      setBookingError("Adult ticket type is unavailable.");
      return;
    }

    updateSelection([
      ...selectedSeats,
      {
        seat,
        ticketTypeSlug: adultTicketType.slug,
      },
    ]);
  };

  const handleRemoveSeat = (seatId: number) => {
    updateSelection(selectedSeats.filter((item) => item.seat.id !== seatId));
  };

  const handleTicketTypeChange = (seatId: number, ticketTypeSlug: string) => {
    if (!availableTicketTypes.some((type) => type.slug === ticketTypeSlug)) {
      setBookingError("This ticket type is not allowed.");
      return;
    }

    updateSelection(
      selectedSeats.map((item) =>
        item.seat.id === seatId ? { ...item, ticketTypeSlug } : item,
      ),
    );
  };

  const handleNext = () => {
    if (isBusy() || !hold?.isLive || !selectedSeats.length) {
      return;
    }

    if (!expiresAt || getRemainingSeconds(expiresAt) === 0) {
      void expireBooking();
      return;
    }

    setActiveStep("checkout");
  };

  const handleBack = () => {
    setActiveStep("seats");
  };

  return {
    activeStep,
    selectedSeats,
    hold,
    bookingError,

    isUpdatingHold,
    isCancelling,

    expiresAt,
    remainingSeconds,

    availableTicketTypes,
    subtotal,
    getSeatPrice,

    seatMap,
    isLoading,
    isError,
    refetch,

    handleSeatSelect,
    handleRemoveSeat,
    handleTicketTypeChange,

    handleNext,
    handleBack,

    releaseCurrentHold,
    handleCancelBooking,
  };
};

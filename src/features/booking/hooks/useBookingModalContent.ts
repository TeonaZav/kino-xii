"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useBooking } from "../context/BookingContext";

interface IUseBookingModalContentProps {
  onClose: () => void;
  registerCancel: (handler: (() => Promise<void>) | null) => void;
}

export const useBookingModalContent = ({
  onClose,
  registerCancel,
}: IUseBookingModalContentProps) => {
  const { activeStep, isUpdatingHold, isCancelling, handleCancelBooking } =
    useBooking();

  const [isClosing, setIsClosing] = useState(false);
  const closingRef = useRef(false);

  const handleCancel = useCallback(async () => {
    if (closingRef.current) return;

    closingRef.current = true;
    setIsClosing(true);

    try {
      const cancelled = await handleCancelBooking();

      if (cancelled) {
        onClose();
      }
    } finally {
      closingRef.current = false;
      setIsClosing(false);
    }
  }, [handleCancelBooking, onClose]);

  useEffect(() => {
    registerCancel(handleCancel);

    return () => {
      registerCancel(null);
    };
  }, [registerCancel, handleCancel]);

  const isBusy = isUpdatingHold || isCancelling || isClosing;

  return {
    activeStep,
    isBusy,
    isClosing,
    isCancelling,
    handleCancel,
  };
};

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useCreateHold } from "./useCreateHold";
import { useReleaseHold } from "./useReleaseHold";
import { useBookingApiError } from "./useBookingApiError";
import { useBookingExpiration } from "./useBookingExpiration";
import {
  clearStoredBooking,
  saveStoredBooking,
} from "@/src/lib/utils/bookingStorage";
import { getRemainingSeconds } from "@/src/lib/utils/formatTime";

import type {
  BookingHold,
  SelectedBookingSeat,
} from "@/src/types/booking.types";

interface IUseBookingHoldProps {
  sessionId: number;
  sessionDate: string;
  movieId: string;
  userId: string;
  initialHold?: BookingHold | null;
  initialSelectedSeats?: SelectedBookingSeat[];
  isSeatStep: boolean;
  refetchSeats: () => Promise<unknown>;
  onAuthenticationRequired?: () => void;
  onProfileRequired?: () => void;
}

export const useBookingHold = ({
  sessionId,
  sessionDate,
  movieId,
  userId,
  initialHold = null,
  initialSelectedSeats = [],
  isSeatStep,
  refetchSeats,
  onAuthenticationRequired,
  onProfileRequired,
}: IUseBookingHoldProps) => {
  // State
  const [selectedSeats, setSelectedSeats] =
    useState<SelectedBookingSeat[]>(initialSelectedSeats);

  const [hold, setHold] = useState<BookingHold | null>(initialHold);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const [isUpdatingHold, setIsUpdatingHold] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const [expiresAt, setExpiresAt] = useState<string | null>(
    initialHold?.expiresAt ?? null,
  );

  const { mutateAsync: createHold } = useCreateHold();
  const { mutateAsync: releaseHold } = useReleaseHold();

  const mountedRef = useRef(false);
  const holdRef = useRef<BookingHold | null>(initialHold);

  const pendingRequestRef = useRef<Promise<void> | null>(null);

  const busyRef = useRef(false);
  const cancellingRef = useRef(false);
  const expiringRef = useRef(false);

  const expireBookingRef = useRef<() => void>(() => {});

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const isBusy = useCallback(
    () => busyRef.current || cancellingRef.current,
    [],
  );

  const isExpirationBusy = useCallback(() => busyRef.current, []);

  const isMounted = useCallback(() => mountedRef.current, []);

  const onExpire = useCallback(() => {
    expireBookingRef.current();
  }, []);

  const { remainingSeconds, setRemainingSeconds } = useBookingExpiration({
    expiresAt,
    initialRemainingSeconds: initialHold?.isLive
      ? getRemainingSeconds(initialHold.expiresAt)
      : 0,
    onExpire,
    isBusy: isExpirationBusy,
    isMounted,
  });

  const resetBooking = useCallback(
    (message?: string) => {
      holdRef.current = null;
      clearStoredBooking();

      if (!mountedRef.current) return;

      setSelectedSeats([]);
      setHold(null);
      setExpiresAt(null);
      setRemainingSeconds(0);
      setBookingError(message ?? null);
    },
    [setRemainingSeconds],
  );

  const expireBooking = useCallback(async () => {
    if (expiringRef.current || cancellingRef.current || busyRef.current) {
      return;
    }

    expiringRef.current = true;

    const holdId = holdRef.current?.holdId;

    resetBooking(
      "Your reservation has expired. Please select your seats again.",
    );

    try {
      if (holdId) {
        await releaseHold(holdId);
      }
    } catch (error) {
      console.error("Unable to release expired hold:", error);
    } finally {
      if (mountedRef.current) {
        void refetchSeats();
      }

      expiringRef.current = false;
    }
  }, [refetchSeats, releaseHold, resetBooking]);

  expireBookingRef.current = () => {
    void expireBooking();
  };

  const shouldIgnoreError = useCallback(
    () => !mountedRef.current || cancellingRef.current,
    [],
  );

  const handleApiError = useBookingApiError({
    setBookingError,
    onAuthenticationRequired,
    onProfileRequired,
    refetchSeats,
    shouldIgnoreError,
  });

  const updateSelection = (nextSeats: SelectedBookingSeat[]) => {
    if (nextSeats.length > 0 && !userId) {
      setBookingError("Please log in to reserve seats.");
      onAuthenticationRequired?.();
      return;
    }

    if (
      busyRef.current ||
      cancellingRef.current ||
      expiringRef.current ||
      !isSeatStep
    ) {
      return;
    }

    busyRef.current = true;
    setIsUpdatingHold(true);
    setBookingError(null);

    const request = (async () => {
      try {
        if (nextSeats.length === 0) {
          const previousHoldId = holdRef.current?.holdId;

          if (previousHoldId) {
            await releaseHold(previousHoldId);
          }

          resetBooking();

          if (mountedRef.current) {
            await refetchSeats();
          }

          return;
        }

        // Create or update hold
        const updatedHold = await createHold({
          sessionId,
          selectedSeats: nextSeats,
        });

        // Make the newest hold available to cancellation
        holdRef.current = updatedHold;

        if (cancellingRef.current) return;

        // Handle an already-expired response
        if (
          !updatedHold.isLive ||
          getRemainingSeconds(updatedHold.expiresAt) === 0
        ) {
          resetBooking(
            "Your reservation has expired. Please select your seats again.",
          );

          try {
            await releaseHold(updatedHold.holdId);
          } catch (error) {
            console.error("Unable to release expired hold:", error);
          }

          if (mountedRef.current) {
            await refetchSeats();
          }

          return;
        }

        // Persist backend hold
        saveStoredBooking({
          holdId: updatedHold.holdId,
          sessionId,
          sessionDate,
          movieId,
          userId,
        });

        if (!mountedRef.current) return;

        setSelectedSeats(nextSeats);
        setHold(updatedHold);
        setExpiresAt(updatedHold.expiresAt);
        setRemainingSeconds(getRemainingSeconds(updatedHold.expiresAt));

        await refetchSeats();
      } catch (error) {
        if (!cancellingRef.current) {
          await handleApiError(error);
        }
      } finally {
        busyRef.current = false;

        if (mountedRef.current) {
          setIsUpdatingHold(false);
        }
      }
    })();

    pendingRequestRef.current = request;

    void request.then(
      () => {
        if (pendingRequestRef.current === request) {
          pendingRequestRef.current = null;
        }
      },
      () => {
        if (pendingRequestRef.current === request) {
          pendingRequestRef.current = null;
        }
      },
    );
  };

  const releaseCurrentHold = async () => {
    await pendingRequestRef.current;

    const holdId = holdRef.current?.holdId;

    if (!holdId) return;

    await releaseHold(holdId);

    resetBooking();

    if (mountedRef.current) {
      await refetchSeats();
    }
  };

  const handleCancelBooking = async (): Promise<boolean> => {
    if (cancellingRef.current) return false;

    cancellingRef.current = true;

    if (mountedRef.current) {
      setIsCancelling(true);
    }

    try {
      await pendingRequestRef.current;

      const currentHoldId = holdRef.current?.holdId;

      if (currentHoldId) {
        await releaseHold(currentHoldId);
      }

      resetBooking();

      if (mountedRef.current) {
        void refetchSeats();
      }

      return true;
    } catch (error) {
      console.error("Unable to cancel booking:", error);

      if (mountedRef.current) {
        setBookingError("Unable to cancel the reservation. Please try again.");
      }

      return false;
    } finally {
      cancellingRef.current = false;

      if (mountedRef.current) {
        setIsCancelling(false);
      }
    }
  };

  return {
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
  };
};

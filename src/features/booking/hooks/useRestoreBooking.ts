"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { getHold } from "@/src/lib/api/bookings";
import {
  clearStoredBooking,
  getStoredBooking,
} from "@/src/lib/utils/bookingStorage";

import type { BookingHold } from "@/src/types/booking.types";

interface IUseRestoreBookingProps {
  movieId: string | null;
  userId: string | null;
  isAuthLoading: boolean;
}

interface RestoredBooking {
  sessionId: number;
  sessionDate: string;
  hold: BookingHold;
}

interface RestoreResult {
  booking: RestoredBooking | null;
  error: string | null;
}

export const useRestoreBooking = ({
  movieId,
  userId,
  isAuthLoading,
}: IUseRestoreBookingProps) => {
  const enabled = !isAuthLoading && movieId !== null;

  const query = useQuery<RestoreResult>({
    queryKey: ["restore-booking", movieId, userId],
    enabled,
    retry: false,
    staleTime: 0,
    gcTime: 0,
    queryFn: async () => {
      const stored = getStoredBooking();

      if (!stored) {
        console.debug("[Booking Restore] No stored booking");

        return { booking: null, error: null };
      }

      if (!userId || stored.userId !== userId) {
        console.debug("[Booking Restore] User mismatch", {
          storedUserId: stored.userId,
          currentUserId: userId,
        });

        return { booking: null, error: null };
      }

      if (stored.movieId !== movieId) {
        return { booking: null, error: null };
      }

      if (!stored.sessionDate) {
        console.warn("[Booking Restore] Missing sessionDate in stored booking");

        return {
          booking: null,
          error: "Unable to restore booking: session date is missing.",
        };
      }

      try {
        const hold = await getHold(stored.holdId);

        if (
          !hold.isLive ||
          hold.sessionId !== stored.sessionId ||
          new Date(hold.expiresAt).getTime() <= Date.now()
        ) {
          clearStoredBooking();

          return { booking: null, error: null };
        }

        console.debug("[Booking Restore] Active hold restored", {
          holdId: hold.holdId,
          sessionId: hold.sessionId,
          seats: hold.seats.map((seat) => seat.code),
          expiresAt: hold.expiresAt,
        });

        return {
          booking: {
            sessionId: stored.sessionId,
            sessionDate: stored.sessionDate,
            hold,
          },
          error: null,
        };
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          [401, 403, 404].includes(error.response?.status ?? 0)
        ) {
          clearStoredBooking();

          return { booking: null, error: null };
        }

        return {
          booking: null,
          error: "Unable to restore your booking. Please try again.",
        };
      }
    },
  });

  const result = useMemo(() => {
    if (!enabled) {
      return {
        restoredBooking: null,
        isRestoring: true,
        restoreError: null,
      };
    }

    return {
      restoredBooking: query.data?.booking ?? null,
      isRestoring: query.isPending,
      restoreError: query.data?.error ?? null,
    };
  }, [enabled, query.data, query.isPending]);

  return result;
};

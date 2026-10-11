import { useCallback } from "react";
import axios from "axios";

interface BookingApiError {
  message?: string;
  errors?: Record<string, string[]>;
  contested?: string[];
}

interface UseBookingApiErrorProps {
  setBookingError: (message: string | null) => void;
  onAuthenticationRequired?: () => void;
  onProfileRequired?: () => void;
  refetchSeats: () => Promise<unknown>;
  shouldIgnoreError: () => boolean;
}

export const useBookingApiError = ({
  setBookingError,
  onAuthenticationRequired,
  onProfileRequired,
  refetchSeats,
  shouldIgnoreError,
}: UseBookingApiErrorProps) => {
  return useCallback(
    async (error: unknown) => {
      if (shouldIgnoreError()) return;

      if (!axios.isAxiosError<BookingApiError>(error)) {
        setBookingError("Unable to reserve seats. Please try again.");
        return;
      }

      const status = error.response?.status;
      const data = error.response?.data;

      if (status === 401) {
        setBookingError("Please log in to reserve seats.");
        onAuthenticationRequired?.();
        return;
      }

      if (status === 409) {
        const contested = data?.contested ?? [];

        setBookingError(
          contested.length
            ? `These seats are no longer available: ${contested.join(", ")}. Please review your selection.`
            : "Some selected seats are no longer available.",
        );

        await refetchSeats();
        return;
      }

      if (status === 422) {
        const message = data?.message ?? "Booking is not allowed.";

        setBookingError(message);

        if (!data?.errors && /profile/i.test(message)) {
          onProfileRequired?.();
        }

        return;
      }

      setBookingError(
        data?.message ?? "Unable to reserve seats. Please try again.",
      );
    },
    [
      setBookingError,
      onAuthenticationRequired,
      onProfileRequired,
      refetchSeats,
      shouldIgnoreError,
    ],
  );
};

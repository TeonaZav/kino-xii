import { useCallback, useMemo } from "react";

import { useAuth } from "@/src/features/auth";
import { useSessionFilterOptionsData } from "../../sessions/hooks/queries/useSessionFilterOptionsData";
import { useSessionSeats } from "./useSessionSeats";

import { restoreSelectedSeats } from "@/src/lib/utils/booking.utils";
import type { BookingHold } from "@/src/types/booking.types";

interface IUseBookingModalProps {
  sessionId: number;
  initialHold?: BookingHold | null;
}

export const useBookingModal = ({
  sessionId,
  initialHold = null,
}: IUseBookingModalProps) => {
  const { user, openLogin } = useAuth();

  const {
    data: filterOptions,
    isLoading: isConfigLoading,
    isError: isConfigError,
    refetch: refetchConfig,
  } = useSessionFilterOptionsData();

  const {
    data: seatMap,
    isLoading: isSeatsLoading,
    isError: isSeatsError,
    refetch: refetchSeats,
  } = useSessionSeats(sessionId);

  const ticketTypes = useMemo(
    () => filterOptions?.ticketTypes ?? [],
    [filterOptions?.ticketTypes],
  );

  const maxSeats = filterOptions?.maxSeatsPerOrder ?? 0;

  const hasValidConfig =
    ticketTypes.some((type) => type.slug === "adult") &&
    Number.isInteger(maxSeats) &&
    maxSeats > 0;

  const isLoading = isConfigLoading || isSeatsLoading;

  const isError = isConfigError || isSeatsError || !seatMap || !hasValidConfig;

  const initialSelectedSeats = useMemo(
    () =>
      initialHold && seatMap ? restoreSelectedSeats(initialHold, seatMap) : [],
    [initialHold, seatMap],
  );

  const handleRetry = useCallback(() => {
    void refetchConfig();
    void refetchSeats();
  }, [refetchConfig, refetchSeats]);

  return {
    user,
    openLogin,
    seatMap,
    ticketTypes,
    maxSeats,
    isLoading,
    isError,
    initialSelectedSeats,
    handleRetry,
  };
};

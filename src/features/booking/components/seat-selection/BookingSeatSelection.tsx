"use client";

import { useBooking } from "../../context/BookingContext";
import { Skeleton } from "@/src/components/ui";
import HallMap from "./hall/HallMap";
import BookingErrorState from "../BookingErrorState";

interface IBookingSeatSelectionProps {
  isBusy: boolean;
}

const BookingSeatSelection = ({ isBusy }: IBookingSeatSelectionProps) => {
  const { seatMap, isLoading, isError, refetch } = useBooking();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-8 w-full" />
        ))}
      </div>
    );
  }

  if (isError || !seatMap) {
    return (
      <BookingErrorState
        message="Unable to load available seats."
        onRetry={() => void refetch()}
        className="min-h-40"
      />
    );
  }

  return (
    <div
      className={isBusy ? "pointer-events-none opacity-70" : ""}
      aria-busy={isBusy}
    >
      <HallMap />
    </div>
  );
};

export default BookingSeatSelection;

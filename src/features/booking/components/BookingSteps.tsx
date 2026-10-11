import cn from "classnames";

import { useBooking } from "../context/BookingContext";

const bookingSteps = [
  { label: "Seats", value: "seats" },
  { label: "Checkout", value: "checkout" },
] as const;

const BookingSteps = () => {
  const { activeStep } = useBooking();

  return (
    <nav aria-label="Booking progress">
      <div className="grid grid-cols-2 rounded-full bg-card">
        {bookingSteps.map(({ label, value }) => (
          <div
            key={value}
            aria-current={activeStep === value ? "step" : undefined}
            className={cn(
              "rounded-full px-4 py-2.5 text-center text-xs font-semibold uppercase",
              activeStep === value ? "bg-red text-white" : "text-secondary",
            )}
          >
            {label}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default BookingSteps;

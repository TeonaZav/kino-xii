import { Button } from "@/src/components/ui";

interface IBookingErrorStateProps {
  onRetry: () => void;
  message?: string;
  className?: string;
}

const BookingErrorState = ({
  onRetry,
  message = "Unable to load booking information.",
  className = "",
}: IBookingErrorStateProps) => {
  return (
    <div
      role="alert"
      className={`flex min-h-60 flex-col items-center justify-center gap-4 ${className}`}
    >
      <p className="text-center text-sm text-secondary">{message}</p>

      <Button variant="primary" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
};

export default BookingErrorState;

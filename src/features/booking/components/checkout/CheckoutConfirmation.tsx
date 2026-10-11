"use client";

import { useRouter } from "next/navigation";
import { Badge, Button, Card, Icon } from "@/src/components/ui";

import type { PaidOrder } from "@/src/types/checkout.types";
import BookingTicketDetails from "../ticket/BookingTicketDetails";
import BookingTicketMovieInfo from "../ticket/BookingTicketMovieInfo";

interface ICheckoutConfirmationProps {
  order: PaidOrder;
  onViewTickets?: () => void;
  onClose: () => void;
}

const CheckoutConfirmation = ({
  order,
  onViewTickets,
  onClose,
}: ICheckoutConfirmationProps) => {
  const { session, tickets } = order;
  const movie = session?.movie ?? "_";

  const router = useRouter();

  const handleBackToHome = () => {
    onClose();
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl p-6 text-center">
      <div className="flex flex-col gap-4 max-w-91.25 items-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-success text-primary">
          <Icon type="Check" className="size-8" />
        </div>
        <h3 className="text-2xl font-extrabold text-primary">
          Booking confirmed!
        </h3>
        <p className="max-w-md text-sm text-secondary">
          Your tickets are ready. We've sent the confirmation to your email.
        </p>
      </div>
      <Badge className="min-w-47.5 justify-center py-2">
        ORDER #{order.reference}
      </Badge>
      <Card className="w-full max-w-168.25 rounded-xl bg-card p-5 text-left">
        <div className="flex gap-4">
          {session.movie.posterUrl && (
            <img
              src={session.movie.posterUrl}
              alt={session.movie.title}
              className="h-16 w-12 shrink-0 rounded-lg object-cover"
            />
          )}

          <BookingTicketMovieInfo movie={movie} session={session} showVenue />
        </div>

        <div className="my-3 border-t border-raised" />

        <BookingTicketDetails tickets={order.tickets} />

        <div className="my-3 border-t border-raised" />

        <div className="flex items-center justify-between">
          <span className="text-sm uppercase text-secondary">Total paid</span>

          <span className="text-lg font-extrabold">₾{order.totalPrice}</span>
        </div>
      </Card>
      <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="primary"
          onClick={onViewTickets}
          className="flex-1 text-sm font-extrabold"
        >
          View my tickets
        </Button>

        <Button
          type="button"
          variant="light"
          onClick={handleBackToHome}
          className="flex-1 text-sm font-extrabold"
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;

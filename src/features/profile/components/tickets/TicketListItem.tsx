"use client";

import { useState } from "react";
import axios from "axios";

import { useRefundOrder } from "../../hooks/useRefundOrder";

import TicketMovieDetails from "./TicketMovieDetails";
import TicketOrderDetails from "./TicketOrderDetails";
import TicketRefundConfirmation from "./TicketRefundConfirmation";
import { Card } from "@/src/components/ui";
import type { TicketOrder } from "@/src/types/ticket.types";

interface ITicketListItemProps {
  order: TicketOrder;
}

const TicketListItem = ({ order }: ITicketListItemProps) => {
  const { mutateAsync, isPending } = useRefundOrder();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [refundError, setRefundError] = useState<string | null>(null);

  const handleRefund = async () => {
    setRefundError(null);

    try {
      await mutateAsync(order.reference);
      setShowConfirmation(false);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : null;

      setRefundError(
        typeof message === "string"
          ? message
          : "Unable to refund this order. Please try again.",
      );

      setShowConfirmation(false);
    }
  };

  return (
    <Card as="li" className="overflow-hidden rounded-3xl">
      <div className="flex flex-col lg:flex-row">
        <TicketMovieDetails order={order} />

        <TicketOrderDetails
          order={order}
          isPending={isPending}
          refundError={refundError}
          onRefundClick={() => setShowConfirmation(true)}
        />
      </div>

      {showConfirmation && (
        <TicketRefundConfirmation
          isPending={isPending}
          onCancel={() => setShowConfirmation(false)}
          onConfirm={handleRefund}
        />
      )}
    </Card>
  );
};

export default TicketListItem;

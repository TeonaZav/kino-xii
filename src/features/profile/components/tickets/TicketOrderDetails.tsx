import { AlertMessage, Button } from "@/src/components/ui";
import { formatPrice } from "@/src/lib/utils/formatPrice";
import { formatRefundDeadline } from "@/src/lib/utils/formatDate";

import type { TicketOrder } from "@/src/types/ticket.types";

import InfoField from "./InfoField";

interface ITicketOrderDetailsProps {
  order: TicketOrder;
  isPending: boolean;
  refundError: string | null;
  onRefundClick: () => void;
}

const TicketOrderDetails = ({
  order,
  isPending,
  refundError,
  onRefundClick,
}: ITicketOrderDetailsProps) => {
  const isRefunded = order.status === "refunded";

  return (
    <div className="flex w-full flex-col gap-2 border-t border-dashed border-raised px-7 py-6 lg:w-75 lg:border-t-0 lg:border-l">
      <InfoField label="Order" value={`#${order.reference}`} />

      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-secondary">
          {isRefunded ? "Refunded" : "Total paid"}
        </span>

        <span className="text-2xl font-extrabold text-primary">
          ₾{formatPrice(order.totalPrice)}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {!isRefunded && (
          <Button
            variant="light"
            disabled={!order.isRefundable || isPending}
            title={
              !order.isRefundable
                ? "Refunds are unavailable within 2 hours of the session."
                : undefined
            }
            onClick={onRefundClick}
          >
            Refund
          </Button>
        )}

        <p className="text-center text-xs text-secondary">
          {isRefunded
            ? "Refunded"
            : order.isRefundable
              ? `Refundable until ${formatRefundDeadline(order.session.startsAt)}`
              : "Refund no longer available"}
        </p>
      </div>

      {refundError && (
        <AlertMessage variant="error">{refundError}</AlertMessage>
      )}
    </div>
  );
};

export default TicketOrderDetails;

import { Button } from "@/src/components/ui";

interface ITicketRefundConfirmationProps {
  isPending: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const TicketRefundConfirmation = ({
  isPending,
  onCancel,
  onConfirm,
}: ITicketRefundConfirmationProps) => {
  return (
    <div className="border-t border-raised p-5">
      <p className="text-sm font-semibold text-primary">Refund this order?</p>

      <p className="mt-2 text-xs text-secondary">
        This action cannot be undone. Your reserved seats will become available
        again.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button variant="light" disabled={isPending} onClick={onCancel}>
          Keep tickets
        </Button>

        <Button variant="primary" disabled={isPending} onClick={onConfirm}>
          {isPending ? "Refunding..." : "Confirm refund"}
        </Button>
      </div>
    </div>
  );
};

export default TicketRefundConfirmation;

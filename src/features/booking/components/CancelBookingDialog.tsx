"use client";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { Button } from "@/src/components/ui";

interface ICancelBookingDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const CancelBookingDialog = ({
  open,
  onClose,
  onConfirm,
  isLoading,
}: ICancelBookingDialogProps) => {
  return (
    <Dialog
      open={open}
      handler={() => {
        if (!isLoading) onClose();
      }}
      size="sm"
      className="rounded-2xl! bg-card! p-2 text-primary"
      {...({} as any)}
    >
      <DialogHeader className="text-xl font-bold text-primary" {...({} as any)}>
        Cancel Booking?
      </DialogHeader>

      <DialogBody className="text-sm text-secondary" {...({} as any)}>
        Are you sure you want to cancel your booking? Your selected seats will
        be released and your reservation will be lost.
      </DialogBody>

      <DialogFooter className="flex gap-3" {...({} as any)}>
        <Button variant="light" onClick={onClose} disabled={isLoading}>
          Keep Booking
        </Button>

        <Button
          variant="primary"
          onClick={onConfirm}
          isLoading={isLoading}
          loadingText="Cancelling..."
        >
          Cancel Booking
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CancelBookingDialog;

import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { Path, UseFormSetError } from "react-hook-form";

import { createOrder } from "@/src/lib/api/bookings";

import type { CreateOrderPayload, PaidOrder } from "@/src/types/checkout.types";
import type { CheckoutFormValues } from "@/src/lib/validation/schemas/checkout.schema";

interface CreateOrderError {
  message?: string;
  errors?: Record<string, string[]>;
  contested?: string[];
}

interface IUseCreateOrderProps {
  holdId: string;
  setError: UseFormSetError<CheckoutFormValues>;
  onSuccess: (order: PaidOrder) => void;
  onUnauthorized: () => void;
  onHoldExpired: (message: string) => void;
  onConflict: (message: string, contested: string[]) => void;
}

const FORM_FIELDS: Path<CheckoutFormValues>[] = [
  "fullName",
  "email",
  "mobileNumber",
  "cardNumber",
  "expiry",
  "cvv",
];

export const useCreateOrder = ({
  holdId,
  setError,
  onSuccess,
  onUnauthorized,
  onHoldExpired,
  onConflict,
}: IUseCreateOrderProps) => {
  const submittingRef = useRef(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation<
    PaidOrder,
    AxiosError<CreateOrderError>,
    CreateOrderPayload
  >({
    mutationFn: createOrder,
    retry: false,

    onSuccess,

    onError: (error) => {
      const status = error.response?.status;
      const data = error.response?.data;

      if (status === 401) {
        onUnauthorized();
        return;
      }

      if (status === 403) {
        setFormError(data?.message ?? "You cannot complete this order.");
        return;
      }

      if (status === 409) {
        onConflict(
          data?.message ?? "Some seats are no longer available.",
          data?.contested ?? [],
        );
        return;
      }

      if (status === 422) {
        if (data?.errors && Object.keys(data.errors).length > 0) {
          Object.entries(data.errors).forEach(([field, messages]) => {
            if (FORM_FIELDS.includes(field as Path<CheckoutFormValues>)) {
              setError(field as Path<CheckoutFormValues>, {
                type: "server",
                message: messages[0] ?? "Invalid value.",
              });
            }
          });

          return;
        }

        if (data?.message?.toLowerCase().includes("expir")) {
          onHoldExpired("Your hold time expired. Please re-select your seats.");
          return;
        }

        setFormError(data?.message ?? "Unable to complete your order.");
        return;
      }

      setFormError(data?.message ?? "Payment failed. Please try again.");
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    if (submittingRef.current || !holdId) return;

    submittingRef.current = true;
    setFormError(null);

    try {
      await mutateAsync({
        holdId,
        ...values,
        cardNumber: values.cardNumber.replace(/\s/g, ""),
        mobileNumber: values.mobileNumber.replace(/[\s()-]/g, ""),
      });
    } catch {
    } finally {
      submittingRef.current = false;
    }
  };

  return {
    onSubmit,
    isPending,
    formError,
  };
};

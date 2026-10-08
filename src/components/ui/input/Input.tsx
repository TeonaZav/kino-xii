"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import cn from "classnames";

import useDebouncedFieldError from "@/src/hooks/useDebouncedFieldError";
import { Icon } from "@/src/components/ui";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isValid?: boolean;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      label,
      error: externalError,
      isValid: externalIsValid = false,
      className,
      disabled,
      name,
      ...props
    },
    ref,
  ) => {
    const formContext = useFormContext();

    const isFormField = Boolean(formContext && name);

    const { register, control, getFieldState, formState } = formContext ?? {};

    const value = useWatch({
      control,
      name: name ?? "",
      disabled: !isFormField,
    });

    const fieldState =
      isFormField && name ? getFieldState?.(name, formState) : undefined;

    const errorMessage = fieldState?.error?.message;

    const debouncedError = useDebouncedFieldError(value, errorMessage, 500);

    const error = isFormField
      ? fieldState?.error?.type === "server" || formState?.isSubmitted
        ? errorMessage
        : debouncedError
      : externalError;

    const isValid = isFormField
      ? Boolean(fieldState?.isDirty && !fieldState.error)
      : externalIsValid;

    const hasError = Boolean(error);
    const hasSuccess = isValid && !hasError;

    const registration = isFormField && name ? register?.(name) : undefined;

    return (
      <div className="flex min-w-0 flex-col gap-2">
        <label
          htmlFor={props.id}
          className={cn(
            "text-xs font-semibold",
            hasError ? "text-error" : "text-primary",
          )}
        >
          {label}
        </label>

        <div className="relative">
          <input
            {...props}
            {...registration}
            name={name}
            ref={(element) => {
              registration?.ref(element);

              if (typeof ref === "function") {
                ref(element);
              } else if (ref) {
                ref.current = element;
              }
            }}
            disabled={disabled}
            aria-invalid={hasError}
            className={cn(
              "h-10 w-full rounded-xl border border-transparent bg-card px-5 pr-12 text-xs font-semibold outline-none placeholder:font-normal placeholder:text-secondary transition-all duration-300",

              !hasError &&
                !disabled &&
                "hover:border-disabled focus:border-disabled hover:bg-raised",

              hasError && "border-error! text-error placeholder:text-error",

              disabled &&
                "cursor-not-allowed text-disabled placeholder:text-disabled",

              className,
            )}
          />

          {hasError && (
            <Icon
              type="Error"
              aria-hidden="true"
              className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-error"
            />
          )}

          {hasSuccess && (
            <Icon
              type="Check"
              aria-hidden="true"
              className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-success"
            />
          )}
        </div>

        {hasError && <p className="text-xs font-medium text-error">{error}</p>}
      </div>
    );
  },
);

export default Input;

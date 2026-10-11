"use client";

import { Controller, useFormContext } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { format, isValid, parseISO } from "date-fns";
import cn from "classnames";

import InputLabel from "./Label";
import { Icon } from "../icons";

import "react-datepicker/dist/react-datepicker.css";

interface IDatePickerProps {
  name: string;
  label: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
}

const DatePicker = ({
  name,
  label,
  placeholder = "Select date",
  minDate,
  maxDate,
  disabled = false,
  className,
}: IDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const hasError = Boolean(fieldState.error);

        const selectedDate = field.value ? parseISO(field.value) : null;

        return (
          <div className="flex flex-col gap-2">
            <InputLabel htmlFor={name} hasError={hasError}>
              {label}
            </InputLabel>

            <div className="relative">
              <ReactDatePicker
                id={name}
                name={field.name}
                selected={
                  selectedDate && isValid(selectedDate) ? selectedDate : null
                }
                onChange={(date: Date | null) => {
                  field.onChange(
                    date && isValid(date) ? format(date, "yyyy-MM-dd") : "",
                  );
                }}
                onBlur={field.onBlur}
                placeholderText={placeholder}
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                minDate={minDate}
                maxDate={maxDate}
                disabled={disabled}
                autoComplete="off"
                wrapperClassName="w-full"
                calendarClassName="kino-datepicker"
                className={cn(
                  "h-10 w-full rounded-xl bg-card px-4 pr-12 text-sm text-primary outline-none transition-colors placeholder:text-secondary focus:ring-1",
                  hasError ? "focus:ring-error" : "focus:ring-raised",
                  disabled && "cursor-not-allowed opacity-50",
                  className,
                )}
              />

              <Icon
                type="Calendar"
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
              />
            </div>

            {fieldState.error?.message && (
              <p className="text-xs font-medium text-error">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default DatePicker;

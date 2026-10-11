"use client";

import classNames from "classnames";
import { Button as MTButton } from "@material-tailwind/react";
import { ImSpinner2 } from "react-icons/im";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "light";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingText?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-red text-white disabled:bg-disabled hover:opacity-80 font-extrabold",
  secondary: "bg-primary text-page font-extrabold",
  outline:
    "border border-secondary text-white hover:bg-primary/10 font-semibold",
  light: "bg-primary/10 text-primary hover:bg-secondary font-extrabold",
};

export default function Button({
  children,
  variant = "primary",
  className,
  type = "button",
  isLoading = false,
  loadingText,
  disabled,
  ...props
}: IButtonProps) {
  return (
    <MTButton
      {...({} as any)}
      {...props}
      type={type}
      variant="filled"
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={classNames(
        "inline-flex items-center justify-center gap-2",
        "rounded-full px-5.5 py-3",
        "text-xs leading-3 2xl:text-sm",
        "normal-case tracking-normal shadow-none",
        "cursor-pointer transition-all duration-300 ease-in-out",
        "disabled:cursor-not-allowed",
        variantClasses[variant],
        className,
      )}
    >
      {isLoading ? (
        <>
          <ImSpinner2 className="size-4 shrink-0 animate-spin" />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </MTButton>
  );
}

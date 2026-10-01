import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "light";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-red text-white disabled:bg-disabled text-secondary",
  secondary: "bg-primary text-page",
  outline: "border border-white text-white",
  light: "bg-primary/10 text-primary",
};

export default function Button({
  children,
  variant = "primary",
  className,
  type = "button",
  ...props
}: IButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={classNames(
        "inline-flex items-center justify-center gap-1 rounded-full px-5.5 py-3 text-sm leading-4 font-extrabold transition-opacity",
        "hover:opacity-90 cursor-pointer transition-colors duration-300 ease-out",
        "disabled:cursor-not-allowed",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

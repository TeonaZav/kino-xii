import { ReactNode } from "react";
import classNames from "classnames";

type BadgeVariant = "default" | "danger";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-primary/10 text-primary",
  danger: "bg-red/10 text-red",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={classNames(
        "inline-flex w-fit items-center gap-1 rounded-full",
        "px-3 py-1.5",
        "text-xs leading-none font-semibold",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

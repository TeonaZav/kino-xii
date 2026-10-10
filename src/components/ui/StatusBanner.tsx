import type { ReactNode } from "react";

import cn from "classnames";

type StatusBannerVariant = "success" | "warning" | "error" | "info";

interface IStatusBannerProps {
  variant?: StatusBannerVariant;
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const variantStyles: Record<
  StatusBannerVariant,
  {
    background: string;
    text: string;
  }
> = {
  success: {
    background: "bg-success/10",
    text: "text-success",
  },
  warning: {
    background: "bg-warning/10",
    text: "text-warning",
  },
  error: {
    background: "bg-error/10",
    text: "text-error",
  },
  info: {
    background: "bg-card",
    text: "text-primary",
  },
};

const StatusBanner = ({
  variant = "info",
  title,
  description,
  icon,
  className,
  titleClassName,
  descriptionClassName,
}: IStatusBannerProps) => {
  const styles = variantStyles[variant];

  return (
    <div
      role="status"
      className={cn("rounded-lg px-3 py-2.5", styles.background, className)}
    >
      <div
        className={cn(
          "flex items-center gap-1 text-sm leading-[100%] font-semibold",
          styles.text,
          titleClassName,
        )}
      >
        <span>{title}</span>
        {icon}
      </div>

      {description && (
        <p
          className={cn(
            "mt-1 text-xs leading-[130%] text-secondary",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default StatusBanner;

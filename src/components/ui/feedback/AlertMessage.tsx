"use client";

import type { ReactNode } from "react";
import { Alert } from "@material-tailwind/react";
import { ImSpinner2 } from "react-icons/im";
import cn from "classnames";

import { Icon } from "../icons";

type AlertMessageVariant = "default" | "success" | "error" | "loading";

interface IAlertMessageProps {
  children: ReactNode;
  variant?: AlertMessageVariant;
  iconOnly?: boolean;
  className?: string;
}

const variantConfig: Record<
  AlertMessageVariant,
  { icon: ReactNode; className: string }
> = {
  default: {
    icon: <Icon type="Error" className="size-4" />,
    className: "border-raised bg-card text-primary",
  },
  success: {
    icon: <Icon type="Check" className="size-4" />,
    className: "border-success/40 bg-success/10 text-success",
  },
  error: {
    icon: <Icon type="Error" className="size-4" />,
    className: "border-error/40 bg-error/10 text-error",
  },
  loading: {
    icon: (
      <ImSpinner2 className="size-5 animate-spin motion-reduce:animate-none" />
    ),
    className: "border-raised bg-card text-primary",
  },
};

const AlertMessage = ({
  children,
  variant = "default",
  iconOnly = false,
  className,
}: IAlertMessageProps) => {
  const config = variantConfig[variant];

  return (
    <Alert
      variant="ghost"
      icon={iconOnly ? undefined : config.icon}
      className={cn(
        "rounded-lg border px-4 py-3 text-xs font-medium",
        config.className,
        className,
      )}
    >
      {iconOnly ? (
        <div role="status" className="flex items-center justify-center">
          {config.icon}
          <span className="sr-only">{children}</span>
        </div>
      ) : (
        children
      )}
    </Alert>
  );
};

export default AlertMessage;

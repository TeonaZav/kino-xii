"use client";

import type { ReactNode } from "react";

import cn from "classnames";
import { Card, Dialog } from "@material-tailwind/react";

interface IModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  outsidePress?: boolean;
}

const Modal = ({
  open,
  onClose,
  children,
  className,
  contentClassName,
  // size = "xs",
  outsidePress = false,
}: IModalProps) => {
  return (
    <Dialog
      open={open}
      handler={onClose}
      // size={size}
      dismiss={{
        enabled: true,
        escapeKey: true,
        outsidePress,
      }}
      className={cn("bg-transparent shadow-none", className)}
      {...({} as any)}
    >
      <Card
        className={cn(
          "mx-auto w-full rounded-[28px] p-8!",
          "border border-raised bg-page",
          "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]",
          "font-archivo text-primary",
          contentClassName,
        )}
        {...({} as any)}
      >
        {children}
      </Card>
    </Dialog>
  );
};

export default Modal;

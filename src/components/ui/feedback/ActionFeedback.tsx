"use client";

import cn from "classnames";
import AlertMessage from "./AlertMessage";

export type FeedbackStatus = "loading" | "success";

interface IActionFeedbackProps {
  status: FeedbackStatus;
  message?: string;
  className?: string;
}

const ActionFeedback = ({
  status,
  message,
  className,
}: IActionFeedbackProps) => {
  const isLoading = status === "loading";

  return (
    <AlertMessage
      variant={isLoading ? "loading" : "success"}
      iconOnly={isLoading}
      className={cn("w-full", className)}
    >
      {isLoading ? "Processing..." : message}
    </AlertMessage>
  );
};

export default ActionFeedback;

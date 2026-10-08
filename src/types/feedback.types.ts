import { AuthAction } from "../lib/constants/messages";

export type FeedbackStatus = "loading" | "success";

export type FeedbackState = {
  status: FeedbackStatus;
  message: string;
};

export type AuthTransitionState = {
  action: AuthAction;
  status: FeedbackStatus;
};

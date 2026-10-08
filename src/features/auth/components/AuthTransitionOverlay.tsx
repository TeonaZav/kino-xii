"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { ActionFeedback } from "@/src/components/ui";
import type { AuthTransitionState } from "@/src/types/feedback.types";
import { FEEDBACK_MESSAGES } from "@/src/lib/constants/messages";
import { feedbackAnimation } from "@/src/lib/constants/animations/feedback.animations";

interface IAuthTransitionOverlayProps {
  transition: AuthTransitionState | null;
}

const AuthTransitionOverlay = ({ transition }: IAuthTransitionOverlayProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {transition && (
        <motion.div
          key={`${transition.action}-${transition.status}`}
          {...feedbackAnimation(Boolean(reduceMotion))}
          className="pointer-events-none fixed inset-x-0 top-6 z-100 flex justify-center px-4"
        >
          <div className="pointer-events-auto w-full max-w-sm shadow-xl">
            <ActionFeedback
              status={transition.status}
              message={FEEDBACK_MESSAGES.auth[transition.action]}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthTransitionOverlay;

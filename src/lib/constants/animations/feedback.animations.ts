import type { MotionProps } from "framer-motion";

export const feedbackAnimation = (reduceMotion: boolean): MotionProps => ({
  initial: reduceMotion ? false : { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0 },
  exit: reduceMotion ? undefined : { opacity: 0, y: -12 },
  transition: {
    duration: reduceMotion ? 0 : 0.2,
  },
});

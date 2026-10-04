import type { MotionProps } from "framer-motion";

export const AUTOPLAY_DELAY = 3000;
export const SLIDE_SPEED = 300;

export const getHeroBackgroundAnimation = (isActive: boolean): MotionProps => ({
  initial: false,
  animate: {
    scale: isActive ? 1.1 : 1,
  },
  transition: {
    duration: isActive ? AUTOPLAY_DELAY / 1000 + SLIDE_SPEED / 1000 : 0,
    ease: "easeOut",
  },
});

export const getHeroContentAnimation = (isActive: boolean): MotionProps => ({
  initial: false,
  animate: {
    opacity: isActive ? 1 : 0,
    y: isActive ? 0 : 16,
  },
  transition: {
    duration: 0.5,
    ease: "easeOut",
    delay: isActive ? 0.15 : 0,
  },
});

export const heroProgressAnimation: MotionProps = {
  initial: {
    width: "0%",
  },
  animate: {
    width: "100%",
  },
  transition: {
    duration: AUTOPLAY_DELAY / 1000,
    ease: "linear",
  },
};

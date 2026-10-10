"use client";

import type { ReactNode } from "react";
import cn from "classnames";
import { motion } from "framer-motion";

import Container from "@/src/components/layout/Container";
import {
  getHeroBackgroundAnimation,
  getHeroContentAnimation,
} from "@/src/lib/constants/animations/hero.animations";

interface IHeroBackgroundWrapperProps {
  backdropUrl: string;
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  contentClassName?: string;
}

const HeroBackgroundWrapper = ({
  backdropUrl,
  children,
  isActive = true,
  className,
  contentClassName,
}: IHeroBackgroundWrapperProps) => {
  return (
    <div className={cn("relative h-full overflow-hidden bg-page", className)}>
      <motion.div
        {...getHeroBackgroundAnimation(isActive)}
        className="absolute inset-0 bg-cover bg-center lg:bg-top"
        style={{
          backgroundImage: `url("${backdropUrl}")`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(0, 0, 0, 0.65) 0%,
              rgba(0, 0, 0, 0.25) 45%,
              transparent 85%
            ),
            linear-gradient(
              to top,
              rgba(7, 12, 28, 0.8) 0%,
              rgba(7, 12, 28, 0.2) 35%,
              transparent 65%
            )
          `,
        }}
      />

      <Container className="relative z-10 h-full">
        <motion.div
          {...getHeroContentAnimation(isActive)}
          className={cn(
            "mx-auto flex h-full w-full max-w-xl flex-col justify-center lg:justify-end",
            "gap-4 pb-20",
            "sm:gap-5 sm:pb-24",
            "md:pb-28",
            "lg:mx-0 lg:max-w-140",
            "xl:gap-6 xl:pb-44.75",
            contentClassName,
          )}
        >
          {children}
        </motion.div>
      </Container>
    </div>
  );
};

export default HeroBackgroundWrapper;

"use client";

import { type CSSProperties, type ReactNode, useRef } from "react";
import cn from "classnames";
import useIsScrolledToEnd from "@/src/features/home/hooks/useIsScrolledToEnd";

const FADE_MASK =
  "linear-gradient(90deg, #000 calc(100% - 8rem), transparent 100%)";

interface ICarouselProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  contentStyle?: CSSProperties;
}

const Carousel = ({
  children,
  className,
  contentClassName,
  contentStyle,
}: ICarouselProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isAtEnd = useIsScrolledToEnd(scrollerRef);

  const scrollerStyle: CSSProperties | undefined = isAtEnd
    ? undefined
    : {
        maskImage: FADE_MASK,
        WebkitMaskImage: FADE_MASK,
      };

  return (
    <div className="@container/carousel">
      <div className="relative">
        <div
          ref={scrollerRef}
          style={scrollerStyle}
          className={cn(
            "no-scrollbar overflow-x-auto overflow-y-hidden",
            "snap-x snap-mandatory scroll-smooth",
            className,
          )}
        >
          <div
            className={cn(
              "flex w-max items-start gap-(--carousel-gap)",
              contentClassName,
            )}
            style={contentStyle}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

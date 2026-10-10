"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type { SwiperProps } from "swiper/react";

import "swiper/css";

const FADE_MASK =
  "linear-gradient(90deg, #000 calc(100% - 8rem), transparent 100%)";

interface ISliderProps<T> extends Omit<SwiperProps, "children"> {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T) => ReactNode;
  slideClassName?: string;
  getSlideClassName?: (item: T) => string;
  fadeEnd?: boolean;
}

const Slider = <T,>({
  items,
  getKey,
  renderItem,
  slideClassName,
  getSlideClassName,
  className,
  fadeEnd = false,
  onSwiper,
  onSlideChange,
  onProgress,
  onResize,
  onBreakpoint,
  onSnapGridLengthChange,
  ...swiperProps
}: ISliderProps<T>) => {
  const [isAtEnd, setIsAtEnd] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);

  const sync = (swiper: SwiperType) => {
    setIsAtEnd(swiper.isEnd || swiper.isLocked);
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed) return;

    const observer = new ResizeObserver(() => {
      if (swiper.destroyed) return;

      swiper.update();
      sync(swiper);
    });

    swiper.slides.forEach((slide) => {
      observer.observe(slide);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <Swiper
      {...swiperProps}
      className={cn("w-full", className)}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
        sync(swiper);
        onSwiper?.(swiper);
      }}
      onSlideChange={(swiper) => {
        sync(swiper);
        onSlideChange?.(swiper);
      }}
      onProgress={(swiper, progress) => {
        sync(swiper);
        onProgress?.(swiper, progress);
      }}
      onResize={(swiper) => {
        sync(swiper);
        onResize?.(swiper);
      }}
      onBreakpoint={(swiper, params) => {
        sync(swiper);
        onBreakpoint?.(swiper, params);
      }}
      onSnapGridLengthChange={(swiper) => {
        sync(swiper);
        onSnapGridLengthChange?.(swiper);
      }}
      style={
        fadeEnd && !isAtEnd
          ? { maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }
          : undefined
      }
    >
      {items.map((item) => (
        <SwiperSlide
          key={getKey(item)}
          className={cn(slideClassName, getSlideClassName?.(item))}
        >
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;

"use client";

import type { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";

import "swiper/css";

interface ISliderProps<T> extends Omit<SwiperProps, "children"> {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T) => ReactNode;
  slideClassName?: string;
}

const Slider = <T,>({
  items,
  getKey,
  renderItem,
  slideClassName,
  className = "w-full",
  ...swiperProps
}: ISliderProps<T>) => {
  return (
    <Swiper className={className} {...swiperProps}>
      {items.map((item) => (
        <SwiperSlide key={getKey(item)} className={slideClassName}>
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;

"use client";

import ChevronLeft from "./chevron-left.svg";
import ChevronRight from "./chevron-right.svg";
import Movie from "./movie-icon.svg";
import Clock from "./clock-icon.svg";
import { cn } from "@/src/lib/utils/cn";

const IconMap = {
  ChevronLeft,
  ChevronRight,
  Movie,
  Clock,
};

export type IconType = keyof typeof IconMap;

export type IconProp = {
  type: IconType;
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
};

export const Icon = ({ onClick, className, type, ...props }: IconProp) => {
  const IconSVG = IconMap[type];

  if (!IconSVG) {
    throw new Error("Select Correct Icon Type");
  }

  return (
    <IconSVG
      onClick={onClick}
      className={cn("inline-block", className)}
      {...props}
    />
  );
};

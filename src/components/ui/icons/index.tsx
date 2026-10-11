"use client";

import { cn } from "@/src/lib/utils/cn";
import ChevronLeft from "./chevron-left.svg";
import ChevronRight from "./chevron-right.svg";
import Movie from "./movie-icon.svg";
import Clock from "./clock-icon.svg";
import Bell from "./bell-icon.svg";
import Check from "./check-icon.svg";
import Error from "./error-icon.svg";
import User from "./user-icon.svg";
import Logout from "./logout-icon.svg";
import ChevronDown from "./chevron-down-icon.svg";
import Input from "../input/Input";
import ThreeDots from "./three-dots.svg";
import Close from "./close-icon.svg";
import Calendar from "./calendar-icon.svg";

const IconMap = {
  ChevronLeft,
  ChevronRight,
  Movie,
  Clock,
  Bell,
  Check,
  Error,
  User,
  Logout,
  ChevronDown,
  Input,
  ThreeDots,
  Close,
  Calendar,
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

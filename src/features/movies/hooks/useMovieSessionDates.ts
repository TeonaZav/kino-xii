"use client";

import { useState } from "react";

import { getNextSevenDays } from "@/src/lib/utils/helpers";

export const useMovieSessionDates = () => {
  const [dates] = useState(getNextSevenDays);

  const [selectedDate, setSelectedDate] = useState(() => dates[0]?.value ?? "");

  return {
    dates,
    selectedDate,
    setSelectedDate,
  };
};

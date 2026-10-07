"use client";

import Slider from "@/src/components/ui/Slider";
import SessionCard from "./SessionCard";
import type { Session } from "@/src/types/session.types";

interface ISessionSliderProps {
  sessions: Session[];
}

const SessionSlider = ({ sessions }: ISessionSliderProps) => {
  return (
    <Slider
      items={sessions}
      getKey={(session) => session.id}
      slidesPerView="auto"
      spaceBetween={12}
      slideClassName="w-auto!"
      renderItem={(session) => <SessionCard session={session} />}
    />
  );
};

export default SessionSlider;

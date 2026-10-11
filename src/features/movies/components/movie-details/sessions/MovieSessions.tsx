"use client";

import { useEffect } from "react";

import { useMovieSessionsData } from "../../../hooks/useMovieSessionsData";
import { useMovieSessionDates } from "../../../hooks/useMovieSessionDates";
import { useRestoreMovieSession } from "../../../hooks/useRestoreMovieSession";

import SessionDateSelector from "./SessionDateSelector";
import SessionVenueList from "./SessionVenueList";

import { AlertMessage, SessionVenueListSkeleton } from "@/src/components/ui";

import type { Session } from "@/src/types/session.types";

interface IMovieSessionsProps {
  movieId: string;
  onSessionSelect: (session: Session) => void;
  onSessionRestored?: (session: Session) => void;
  restoreSessionId?: number | null;
  restoreDate?: string | null;
}

const MovieSessions = ({
  movieId,
  onSessionSelect,
  onSessionRestored,
  restoreSessionId = null,
  restoreDate = null,
}: IMovieSessionsProps) => {
  const { dates, selectedDate, setSelectedDate } = useMovieSessionDates();

  const {
    data: venues = [],
    isLoading,
    isError,
  } = useMovieSessionsData(movieId, selectedDate);

  useEffect(() => {
    if (!restoreDate || selectedDate === restoreDate) return;

    setSelectedDate(restoreDate);
  }, [restoreDate, selectedDate, setSelectedDate]);

  const sessions = venues.flatMap((venue) => venue.sessions ?? []);

  useRestoreMovieSession({
    sessions,
    restoreSessionId,
    restoreDate,
    selectedDate,
    isReady: !isLoading && !isError,
    onSessionRestored,
  });

  return (
    <section className="flex min-w-0 flex-col gap-7">
      <SessionDateSelector
        dates={dates}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      {isLoading ? (
        <SessionVenueListSkeleton />
      ) : isError ? (
        <AlertMessage variant="error">
          Unable to load sessions. Please try again.
        </AlertMessage>
      ) : (
        <SessionVenueList venues={venues} onSessionSelect={onSessionSelect} />
      )}
    </section>
  );
};

export default MovieSessions;

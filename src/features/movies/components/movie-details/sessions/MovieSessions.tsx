"use client";

import type { Session } from "@/src/types/session.types";

import { useMovieSessionsData } from "../../../hooks/useMovieSessionsData";
import { useMovieSessionDates } from "../../../hooks/useMovieSessionDates";

import SessionDateSelector from "./SessionDateSelector";
import SessionVenueList from "./SessionVenueList";
import { AlertMessage, SessionVenueListSkeleton } from "@/src/components/ui";

interface IMovieSessionsProps {
  movieId: string;
  onSessionSelect: (session: Session) => void;
}

const MovieSessions = ({ movieId, onSessionSelect }: IMovieSessionsProps) => {
  const { dates, selectedDate, setSelectedDate } = useMovieSessionDates();

  const {
    data: venues = [],
    isLoading,
    isError,
  } = useMovieSessionsData(movieId, selectedDate);

  return (
    <section className="flex min-w-0 flex-col gap-7">
      <SessionDateSelector
        dates={dates}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      {isLoading && <SessionVenueListSkeleton />}

      {isError && (
        <AlertMessage variant="error">
          Unable to load sessions. Please try again.
        </AlertMessage>
      )}

      {!isLoading && !isError && (
        <SessionVenueList venues={venues} onSessionSelect={onSessionSelect} />
      )}
    </section>
  );
};

export default MovieSessions;

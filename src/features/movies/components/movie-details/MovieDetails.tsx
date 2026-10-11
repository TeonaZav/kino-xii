"use client";

import { useCallback, useState } from "react";

import { useAuth } from "@/src/features/auth";
import { useMovieDetailsData } from "../../hooks/useMovieDetailsData";
import { useRestoreBooking } from "@/src/features/booking/hooks/useRestoreBooking";

import { HeroSkeleton } from "@/src/components/ui";
import Container from "@/src/components/layout/Container";
import HeroError from "@/src/features/home/components/hero/HeroError";
import BookingModal from "@/src/features/booking/components/BookingModal";
import MovieSessions from "./sessions/MovieSessions";
import MovieDetailsHero from "./hero/MovieDetailsHero";
import MovieInformation from "./information/MovieInformation";
import type { Session } from "@/src/types/session.types";

interface IMovieDetailsProps {
  movieId: string;
}

const MovieDetails = ({ movieId }: IMovieDetailsProps) => {
  const {
    data: movie,
    isLoading,
    isError,
    refetch,
  } = useMovieDetailsData(movieId);

  const { user, isAuthLoading } = useAuth();

  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [dismissedHoldId, setDismissedHoldId] = useState<string | null>(null);

  const { restoredBooking, isRestoring, restoreError } = useRestoreBooking({
    movieId: movie ? String(movie.id) : null,
    userId: user ? String(user.id) : null,
    isAuthLoading,
  });

  const activeRestoredBooking =
    restoredBooking && restoredBooking.hold.holdId !== dismissedHoldId
      ? restoredBooking
      : null;

  const handleSessionSelect = useCallback((session: Session) => {
    setSelectedSession(session);
  }, []);

  const handleCloseBooking = useCallback(() => {
    if (activeRestoredBooking) {
      setDismissedHoldId(activeRestoredBooking.hold.holdId);
    }

    setSelectedSession(null);
  }, [activeRestoredBooking]);

  if (isLoading) {
    return <HeroSkeleton />;
  }

  if (isError) {
    return <HeroError onRetry={() => void refetch()} />;
  }

  if (!movie) return null;

  return (
    <>
      <MovieDetailsHero movie={movie} />

      <Container className="mx-auto flex flex-col gap-12 py-8 xl:flex-row xl:justify-between">
        <div className="flex min-w-0 flex-col">
          {isRestoring && (
            <p className="mb-3 text-xs text-secondary">
              Restoring your booking...
            </p>
          )}

          {restoreError && (
            <p role="alert" className="mb-3 text-xs text-red">
              {restoreError}
            </p>
          )}

          <MovieSessions
            movieId={movieId}
            onSessionSelect={handleSessionSelect}
            restoreSessionId={activeRestoredBooking?.sessionId ?? null}
            restoreDate={activeRestoredBooking?.sessionDate ?? null}
            onSessionRestored={handleSessionSelect}
          />
        </div>

        <MovieInformation movie={movie} />
      </Container>

      {selectedSession && !isRestoring && (
        <BookingModal
          key={`${selectedSession.id}-${activeRestoredBooking?.hold.holdId ?? "new"}`}
          movie={movie}
          session={selectedSession}
          initialHold={
            activeRestoredBooking?.sessionId === selectedSession.id
              ? activeRestoredBooking.hold
              : null
          }
          onClose={handleCloseBooking}
        />
      )}
    </>
  );
};

export default MovieDetails;

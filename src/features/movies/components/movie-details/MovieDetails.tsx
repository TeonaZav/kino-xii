"use client";

import { useState } from "react";
import { useMovieDetailsData } from "../../hooks/useMovieDetailsData";
import Container from "@/src/components/layout/Container";
import { HeroSkeleton } from "@/src/components/ui";
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

  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
  };

  const handleCloseBooking = () => {
    setSelectedSession(null);
  };

  if (isLoading) return <HeroSkeleton />;

  if (isError) {
    return <HeroError onRetry={() => refetch()} />;
  }

  if (!movie) return null;

  return (
    <>
      <MovieDetailsHero movie={movie} />

      <Container className="mx-auto flex flex-col xl:justify-between gap-12 py-8 xl:flex-row">
        <MovieSessions
          movieId={movieId}
          onSessionSelect={handleSessionSelect}
        />

        <MovieInformation movie={movie} />
      </Container>

      {selectedSession && (
        <BookingModal
          movie={movie}
          session={selectedSession}
          onClose={handleCloseBooking}
        />
      )}
    </>
  );
};

export default MovieDetails;

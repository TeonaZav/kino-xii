"use client";

import { useNowPlayingMovies } from "../../hooks/useNowPlayingMovies";
import useExpandableMovieCard from "../../hooks/useExpandableMovieCard";

import Container from "@/src/components/layout/Container";
import { SectionError, SectionHeading } from "@/src/components/ui";
import { SeeAllLink } from "@/src/features/shared";
import NowPlayingSlider from "./NowPlayingSlider";

const NowPlaying = () => {
  const { expandedMovieId, handleCardClick } = useExpandableMovieCard();

  const {
    data: movies = [],
    isLoading,
    isError,
    refetch,
  } = useNowPlayingMovies();

  if (!isLoading && !isError && !movies.length) {
    return null;
  }

  return (
    <section className="overflow-x-clip pt-8 pb-10">
      <Container className="overflow-visible!">
        <div className="mb-6 flex items-center justify-between">
          <SectionHeading>Now Playing</SectionHeading>

          {!isError && <SeeAllLink href="/sessions" />}
        </div>

        {isError ? (
          <SectionError onRetry={refetch} />
        ) : (
          <NowPlayingSlider
            movies={movies}
            isLoading={isLoading}
            expandedMovieId={expandedMovieId}
            onExpand={handleCardClick}
          />
        )}
      </Container>
    </section>
  );
};

export default NowPlaying;

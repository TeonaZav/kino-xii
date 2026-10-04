"use client";

import Link from "next/link";

import { useNowPlayingMovies } from "../../hooks/useNowPlayingMovies";
import useExpandableMovieCard from "../../hooks/useExpandableMovieCard";

import Container from "@/src/components/layout/Container";
import {
  Carousel,
  NowPlayingCardSkeleton,
  SectionError,
  SectionHeading,
} from "@/src/components/ui";
import NowPlayingCard from "./NowPlayingCard";

const SKELETON_COUNT = 6;

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

          {!isError && (
            <Link href="/sessions" className="text-sm font-semibold text-red">
              See all
            </Link>
          )}
        </div>

        {isError ? (
          <SectionError onRetry={() => refetch()} />
        ) : (
          <Carousel
            className="now-playing-carousel"
            contentStyle={{
              height: "calc(var(--card-width) * 452 / 260)",
            }}
          >
            {isLoading
              ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                  <NowPlayingCardSkeleton key={index} />
                ))
              : movies.map((movie) => (
                  <NowPlayingCard
                    key={movie.id}
                    movie={movie}
                    isExpanded={expandedMovieId === movie.id}
                    onExpand={() => handleCardClick(movie.id)}
                  />
                ))}
          </Carousel>
        )}
      </Container>
    </section>
  );
};

export default NowPlaying;

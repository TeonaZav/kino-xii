"use client";

import Link from "next/link";

import Container from "@/src/components/layout/Container";
import { Carousel, SectionHeading } from "@/src/components/ui";

import NowPlayingCard from "./NowPlayingCard";

import { useNowPlayingMovies } from "../../hooks/useNowPlayingMovies";
import useExpandableMovieCard from "../../hooks/useExpandableMovieCard";

const NowPlaying = () => {
  const { expandedMovieId, handleCardClick } = useExpandableMovieCard();

  const { data: movies = [], isLoading, isError } = useNowPlayingMovies();

  if (isLoading || isError || !movies.length) {
    return null;
  }

  return (
    <section className="overflow-x-clip pt-8 pb-10">
      <Container className="overflow-visible!">
        <div className="mb-6 flex items-center justify-between">
          <SectionHeading>Now Playing</SectionHeading>

          <Link href="/sessions" className="text-sm font-semibold text-red">
            See all
          </Link>
        </div>

        <Carousel
          className="now-playing-carousel"
          contentStyle={{
            height: "calc(var(--card-width) * 452 / 260)",
          }}
        >
          {movies.map((movie) => (
            <NowPlayingCard
              key={movie.id}
              movie={movie}
              isExpanded={expandedMovieId === movie.id}
              onExpand={() => handleCardClick(movie.id)}
            />
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default NowPlaying;

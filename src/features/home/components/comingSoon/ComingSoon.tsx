"use client";

import Link from "next/link";

import { useComingSoonMovies } from "../../hooks/useComingSoonMovies";
import Container from "@/src/components/layout/Container";
import {
  Carousel,
  ComingSoonCardSkeleton,
  SectionError,
  SectionHeading,
} from "@/src/components/ui";
import ComingSoonCard from "./ComingSoonCard";

const SKELETON_COUNT = 5;

const ComingSoon = () => {
  const {
    data: movies = [],
    isLoading,
    isError,
    refetch,
  } = useComingSoonMovies();

  if (!isLoading && !isError && !movies.length) {
    return null;
  }

  return (
    <section className="overflow-x-clip pt-8 pb-10">
      <Container className="overflow-visible!">
        <div className="mb-6 flex items-center justify-between">
          <SectionHeading>COMING SOON...</SectionHeading>

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
            className="coming-soon-carousel"
            contentStyle={{
              height: "var(--card-height)",
            }}
          >
            {isLoading
              ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                  <ComingSoonCardSkeleton key={index} />
                ))
              : movies.map((movie) => (
                  <ComingSoonCard key={movie.id} movie={movie} />
                ))}
          </Carousel>
        )}
      </Container>
    </section>
  );
};

export default ComingSoon;

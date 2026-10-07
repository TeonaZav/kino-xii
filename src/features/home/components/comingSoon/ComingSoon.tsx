"use client";

import { useComingSoonMovies } from "../../hooks/useComingSoonMovies";

import Container from "@/src/components/layout/Container";
import { SectionError, SectionHeading } from "@/src/components/ui";
import { SeeAllLink } from "@/src/features/shared";

import ComingSoonSlider from "./ComingSoonSlider";

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

          {!isError && <SeeAllLink href="/sessions" />}
        </div>

        {isError ? (
          <SectionError onRetry={refetch} />
        ) : (
          <ComingSoonSlider movies={movies} isLoading={isLoading} />
        )}
      </Container>
    </section>
  );
};

export default ComingSoon;

import cn from "classnames";

import {
  MovieSynopsis,
  HeroMovieHeading,
  MovieMetadata,
  HeroBackgroundWrapper,
} from "@/src/features/shared";
import MoviePoster from "./MoviePoster";
import type { Movie } from "@/src/types/movie.types";

interface IMovieDetailsHeroProps {
  movie: Movie;
}

const MovieDetailsHero = ({ movie }: IMovieDetailsHeroProps) => {
  return (
    <section
      className={cn(
        "relative min-h-[70svh] max-h-141.75 w-full bg-page",
        "lg:aspect-1728/567 xl:h-141.75 xl:min-h-0 xl:max-h-none",
      )}
    >
      <HeroBackgroundWrapper
        backdropUrl={movie.backdropUrl}
        contentClassName="lg:max-w-none pt-37.75! pb-10.25!"
      >
        <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-end lg:gap-8">
          <MoviePoster {...movie} />

          <div className="flex min-w-0 flex-1 flex-col items-center gap-3 text-center sm:gap-4 lg:items-start lg:pb-2 lg:text-left 2xl:gap-4.5 ">
            <HeroMovieHeading title={movie.title} badgeText="NOW PLAYING" />

            <MovieSynopsis
              synopsis={movie.synopsis}
              collapsible={false}
              className="max-w-xl lg:max-w-2xl"
              textClassName="line-clamp-3 text-sm leading-[130%] text-primary 2xl:line-clamp-4 2xl:text-base"
            />

            <MovieMetadata
              ageRating={movie.ageRating}
              runtimeMinutes={movie.runtimeMinutes}
              formats={movie.formats}
            />
          </div>
        </div>
      </HeroBackgroundWrapper>
    </section>
  );
};

export default MovieDetailsHero;

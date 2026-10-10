import type { Movie } from "@/src/types/movie.types";

import { formatReleaseDate } from "@/src/lib/utils/formatDate";
import {
  MovieSynopsis,
  HeroMovieHeading,
  MovieMetadata,
} from "@/src/features/shared";

interface IHeroMovieInfoProps {
  movie: Movie;
  badgeText?: string;
}

const HeroMovieInfo = ({ movie, badgeText }: IHeroMovieInfoProps) => {
  const defaultBadgeText = `Premiere · Week of ${formatReleaseDate(movie.releaseDate)}`;

  return (
    <div className="flex flex-col items-center gap-3 text-center sm:gap-4 lg:items-start lg:text-left 2xl:gap-4.5">
      <HeroMovieHeading
        title={movie.title}
        badgeText={badgeText ?? defaultBadgeText}
      />

      <MovieMetadata
        ageRating={movie.ageRating}
        runtimeMinutes={movie.runtimeMinutes}
        formats={movie.formats}
      />

      <MovieSynopsis
        synopsis={movie.synopsis}
        collapsible={false}
        className="max-w-xl text-primary lg:max-w-2xl"
        textClassName="line-clamp-3 text-sm leading-[130%] text-primary 2xl:line-clamp-4 2xl:text-base"
      />
    </div>
  );
};

export default HeroMovieInfo;

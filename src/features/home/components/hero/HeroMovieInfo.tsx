import Badge from "@/src/components/ui/Badge";
import { Icon } from "@/src/components/ui/icons";

import type { Movie } from "../../../../types/movie.types";
import { formatReleaseDate } from "@/src/lib/utils/formatDate";

import MovieSynopsis from "../shared/MovieSynopsis";

interface IHeroMovieInfoProps {
  movie: Movie;
}

const HeroMovieInfo = ({ movie }: IHeroMovieInfoProps) => {
  return (
    <div className="flex flex-col items-center gap-3 text-center sm:gap-4 lg:items-start lg:text-left 2xl:gap-4.5">
      <Badge variant="danger">
        Premiere · Week of {formatReleaseDate(movie.releaseDate)}
      </Badge>

      <h3 className="text-xl leading-none font-extrabold text-primary uppercase sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[40px]">
        {movie.title}
      </h3>

      <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
        <Badge variant="danger">{movie.ageRating.code}</Badge>

        <Badge>
          <Icon type="Clock" className="size-4" />
          {movie.runtimeMinutes} Min
        </Badge>

        {movie.formats.map((format) => (
          <Badge key={format.id}>{format.name}</Badge>
        ))}
      </div>

      <MovieSynopsis
        synopsis={movie.synopsis}
        collapsible={false}
        className="max-w-xl text-primary lg:max-w-2xl"
        textClassName="line-clamp-3 2xl:line-clamp-4 text-sm 2xl:text-base leading-[130%] text-primary 2xl:text-base"
      />
    </div>
  );
};

export default HeroMovieInfo;

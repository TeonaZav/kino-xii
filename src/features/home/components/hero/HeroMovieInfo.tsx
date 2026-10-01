import Badge from "@/src/components/ui/Badge";
import { Icon } from "@/src/components/ui/icons";

import type { Movie } from "../../types";
import { formatReleaseDate } from "@/src/lib/utils/formatDate";

interface IHeroMovieInfoProps {
  movie: Movie;
}

const HeroMovieInfo = ({ movie }: IHeroMovieInfoProps) => {
  return (
    <div className="flex flex-col gap-4.5">
      <Badge variant="danger">
        Premiere · Week of {formatReleaseDate(movie.releaseDate)}
      </Badge>

      <h3 className="text-[40px] leading-none font-extrabold text-primary uppercase">
        {movie.title}
      </h3>

      <div className="flex items-center gap-2">
        <Badge variant="danger">{movie.ageRating.code}</Badge>

        <Badge>
          <Icon type="Clock" className="size-4" />
          {movie.runtimeMinutes} Min
        </Badge>

        {movie.formats.map((format) => (
          <Badge key={format.id}>{format.name}</Badge>
        ))}
      </div>

      <p className="text-base leading-[130%]">{movie.ageRating.description}</p>
    </div>
  );
};

export default HeroMovieInfo;

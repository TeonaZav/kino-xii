import cn from "classnames";

import CardPoster from "./CardPoster";
import CardFooter from "./CardFooter";
import MovieSynopsis from "../../../../shared/MovieSynopsis";
import { Badge, Card } from "@/src/components/ui";
import type { Movie } from "@/src/types/movie.types";

interface INowPlayingCardProps {
  movie: Movie;
  isExpanded: boolean;
  onExpand: () => void;
}

const NowPlayingCard = ({
  movie,
  isExpanded,
  onExpand,
}: INowPlayingCardProps) => {
  return (
    <Card
      as="article"
      onClick={onExpand}
      className={cn(
        "now-playing-card-size",
        "group relative flex shrink-0 snap-start flex-col p-3",
        "transition-[width] duration-400 ease-out",
        "hover:w-(--expanded-card-width)",
        isExpanded && "w-(--expanded-card-width)!",
      )}
    >
      <CardPoster
        src={movie.posterUrl}
        alt={movie.title}
        isExpanded={isExpanded}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-2 pt-3 pb-14">
        <div className="flex flex-col gap-2">
          <h4 className="text-sm 2xl:text-[20px] leading-none font-extrabold text-primary">
            {movie.title}
          </h4>

          <p className="text-sm leading-[130%] text-secondary">
            {movie.genres[0]?.name} · {movie.runtimeMinutes} min
          </p>

          <Badge variant="danger" className="px-2 py-1">
            {movie.ageRating.code}
          </Badge>
        </div>

        <MovieSynopsis
          synopsis={movie.synopsis}
          isExpanded={isExpanded}
          className="text-secondary"
        />
      </div>

      <CardFooter fromPrice={movie.fromPrice} />
    </Card>
  );
};

export default NowPlayingCard;

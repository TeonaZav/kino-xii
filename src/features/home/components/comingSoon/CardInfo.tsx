import type { Movie } from "@/src/types/movie.types";

import { Badge, Button, Icon } from "@/src/components/ui";
import { formatReleaseDateLabel } from "@/src/lib/utils/formatDate";

interface ICardInfoProps {
  movie: Movie;
}

const CardInfo = ({ movie }: ICardInfoProps) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 justify-between">
      <div className="flex flex-col gap-1.75">
        <p className="text-red text-xs uppercase font-extrabold">
          {formatReleaseDateLabel(movie.releaseDate)}
        </p>
        <h4 className="text-xs leading-none font-extrabold text-primary">
          {movie.title}
        </h4>

        <p className="text-xs leading-[130%] text-secondary">
          {movie.genres[0]?.name} · {movie.runtimeMinutes} min
        </p>

        <Badge variant="danger" className="px-2 py-1">
          {movie.ageRating.code}
        </Badge>
      </div>

      {/* TODO: Implement "Notify Me" functionality for upcoming movie releases.  */}

      <Button
        variant="outline"
        className="w-max py-1.5! px-3! text-primary text-xs"
      >
        <Icon type="Bell" className="size-4" /> Notify Me
      </Button>
    </div>
  );
};
export default CardInfo;

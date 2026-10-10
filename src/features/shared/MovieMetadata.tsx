import cn from "classnames";
import { Badge, Icon } from "@/src/components/ui";
import type { Movie } from "@/src/types/movie.types";

interface IMovieMetadataProps {
  ageRating: Movie["ageRating"];
  runtimeMinutes: Movie["runtimeMinutes"];
  formats: Movie["formats"];
  className?: string;
}

const MovieMetadata = ({
  ageRating,
  runtimeMinutes,
  formats,
  className,
}: IMovieMetadataProps) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 lg:justify-start",
        className,
      )}
    >
      <Badge variant="danger">{ageRating.code}</Badge>

      <Badge>
        <Icon type="Clock" className="size-4" />
        {runtimeMinutes} Min
      </Badge>

      {formats.map((format) => (
        <Badge key={format.id}>{format.name}</Badge>
      ))}
    </div>
  );
};

export default MovieMetadata;

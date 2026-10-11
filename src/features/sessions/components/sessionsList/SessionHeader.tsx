import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/src/components/ui";
import type { Movie } from "@/src/types/movie.types";
import MovieTitle from "@/src/features/shared/MovieTitle";

interface ISessionHeaderProps {
  movie: Movie;
}

const SessionHeader = ({ movie }: ISessionHeaderProps) => {
  return (
    <Link
      href={`/movies/${encodeURIComponent(movie.slug)}`}
      className="flex w-fit items-center gap-4"
    >
      <figure className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          sizes="56px"
          className="object-cover"
        />
      </figure>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <MovieTitle title={movie.title} className="text-lg font-extrabold" />

          <Badge variant="danger">{movie.ageRating.code}</Badge>
        </div>

        <p className="text-sm text-secondary">{movie.runtimeMinutes} min</p>
      </div>
    </Link>
  );
};

export default SessionHeader;

import Image from "next/image";
import Link from "next/link";

import type { Movie } from "@/src/types/movie.types";

interface ISearchResultItemProps {
  movie: Movie;
  onSelect: () => void;
}

const SearchResultItem = ({ movie, onSelect }: ISearchResultItemProps) => {
  return (
    <Link
      href={`/movies/${encodeURIComponent(movie.slug)}`}
      onClick={onSelect}
      className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-card"
    >
      <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-md">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          sizes="44px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold text-primary">
          {movie.title}
        </h4>

        <p className="mt-1 text-xs text-secondary">
          {movie.kind === "film" ? "Film" : "Event"}
          {" · "}
          {movie.ageRating?.code}
          {" · "}
          {movie.runtimeMinutes} min
        </p>
      </div>

      <div className="shrink-0 text-right">
        {movie.isComingSoon ? (
          <span className="text-xs font-semibold text-orange-400">
            Coming Soon
          </span>
        ) : (
          <span className="text-xs font-semibold text-primary">
            from ₾{movie.fromPrice}
          </span>
        )}
      </div>
    </Link>
  );
};

export default SearchResultItem;

import Image from "next/image";

import type { Movie } from "@/src/types/movie.types";

type MoviePosterProps = Pick<Movie, "posterUrl" | "title">;

const MoviePoster = ({ posterUrl, title }: MoviePosterProps) => {
  return (
    <figure className="relative aspect-289/374 w-40 shrink-0 overflow-hidden rounded-xl sm:w-48 xl:w-72.25 shadow-md">
      <Image
        src={posterUrl}
        alt={`${title} poster`}
        fill
        sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 289px"
        className="object-cover"
      />
    </figure>
  );
};

export default MoviePoster;

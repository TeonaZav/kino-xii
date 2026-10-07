import { NowPlayingCardSkeleton, Slider } from "@/src/components/ui";
import type { Movie } from "@/src/types/movie.types";

import NowPlayingCard from "./card/NowPlayingCard";

const SKELETON_COUNT = 6;

interface INowPlayingSliderProps {
  movies: Movie[];
  isLoading: boolean;
  expandedMovieId: number | null;
  onExpand: (movieId: number) => void;
}

const NowPlayingSlider = ({
  movies,
  isLoading,
  expandedMovieId,
  onExpand,
}: INowPlayingSliderProps) => {
  if (isLoading) {
    return (
      <Slider
        items={Array.from({ length: SKELETON_COUNT }, (_, index) => index)}
        getKey={(index) => index}
        slidesPerView="auto"
        spaceBetween={17}
        slideClassName="w-(--card-width)!"
        className="now-playing-carousel"
        fadeEnd
        renderItem={() => <NowPlayingCardSkeleton />}
      />
    );
  }

  return (
    <Slider
      items={movies}
      getKey={(movie) => movie.id}
      slidesPerView="auto"
      spaceBetween={17}
      slideClassName="w-auto!"
      className="now-playing-carousel"
      fadeEnd
      renderItem={(movie) => (
        <NowPlayingCard
          movie={movie}
          isExpanded={expandedMovieId === movie.id}
          onExpand={() => onExpand(movie.id)}
        />
      )}
    />
  );
};

export default NowPlayingSlider;

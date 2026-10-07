import { ComingSoonCardSkeleton, Slider } from "@/src/components/ui";
import type { Movie } from "@/src/types/movie.types";
import ComingSoonCard from "./card/ComingSoonCard";

const SKELETON_COUNT = 5;

interface IComingSoonSliderProps {
  movies: Movie[];
  isLoading: boolean;
}

const ComingSoonSlider = ({ movies, isLoading }: IComingSoonSliderProps) => {
  if (isLoading) {
    return (
      <Slider
        items={Array.from({ length: SKELETON_COUNT }, (_, index) => index)}
        getKey={(index) => index}
        slidesPerView="auto"
        spaceBetween={17}
        slideClassName="w-auto!"
        className="coming-soon-carousel"
        fadeEnd
        renderItem={() => <ComingSoonCardSkeleton />}
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
      className="coming-soon-carousel"
      fadeEnd
      renderItem={(movie) => <ComingSoonCard movie={movie} />}
    />
  );
};

export default ComingSoonSlider;

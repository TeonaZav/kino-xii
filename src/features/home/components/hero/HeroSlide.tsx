import { Button } from "@/src/components/ui";
import { BuyTicketButton, HeroBackgroundWrapper } from "@/src/features/shared";
import HeroMovieInfo from "./HeroMovieInfo";

import type { Movie } from "@/src/types/movie.types";

interface IHeroSlideProps {
  movie: Movie;
  isActive: boolean;
}

const HeroSlide = ({ movie, isActive }: IHeroSlideProps) => {
  return (
    <HeroBackgroundWrapper backdropUrl={movie.backdropUrl} isActive={isActive}>
      <HeroMovieInfo movie={movie} />

      <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
        <BuyTicketButton movieSlug={movie.slug} showIcon />

        <Button variant="light">All sessions</Button>
      </div>
    </HeroBackgroundWrapper>
  );
};

export default HeroSlide;

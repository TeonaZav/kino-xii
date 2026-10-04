import classNames from "classnames";
import { motion } from "framer-motion";

import Container from "@/src/components/layout/Container";
import CarouselNavigationButton from "./CarouselNavigationButton";

import { heroProgressAnimation } from "@/src/lib/constants/animations/heroAnimations";

import type { Movie } from "../../../../types/movie.types";

interface IHeroControlsProps {
  movies: Movie[];
  activeIndex: number;
  progressKey: number;
  onPrevious: () => void;
  onNext: () => void;
  onPaginationClick: (index: number) => void;
}

const HeroControls = ({
  movies,
  activeIndex,
  progressKey,
  onPrevious,
  onNext,
  onPaginationClick,
}: IHeroControlsProps) => {
  return (
    <Container className="pointer-events-none absolute inset-x-0 bottom-5 z-20 2xl:bottom-10.5">
      <div className="flex items-center gap-5">
        <div className="pointer-events-auto flex flex-1 gap-2">
          {movies.map((movie, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={movie.id}
                type="button"
                aria-label={`Go to ${movie.title}`}
                onClick={() => onPaginationClick(index)}
                className={classNames(
                  "relative h-0.75 flex-1 cursor-pointer overflow-hidden",
                  "rounded bg-primary",
                )}
              >
                {isActive && (
                  <motion.span
                    {...heroProgressAnimation}
                    key={`${movie.id}-${progressKey}`}
                    className="absolute inset-y-0 left-0 bg-red"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="pointer-events-auto flex shrink-0 items-center gap-3">
          <CarouselNavigationButton
            icon="ChevronLeft"
            label="Previous movie"
            onClick={onPrevious}
          />

          <CarouselNavigationButton
            icon="ChevronRight"
            label="Next movie"
            onClick={onNext}
          />
        </div>
      </div>
    </Container>
  );
};

export default HeroControls;

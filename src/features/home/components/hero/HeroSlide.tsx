import classNames from "classnames";
import { motion } from "framer-motion";

import Container from "@/src/components/layout/Container";
import { Button } from "@/src/components/ui";

import HeroMovieInfo from "./HeroMovieInfo";

import {
  getHeroBackgroundAnimation,
  getHeroContentAnimation,
} from "@/src/lib/constants/animations/hero.animations";

import { BuyTicketButton } from "@/src/features/shared";
import type { Movie } from "../../../../types/movie.types";

interface IHeroSlideProps {
  movie: Movie;
  isActive: boolean;
}

const HeroSlide = ({ movie, isActive }: IHeroSlideProps) => {
  return (
    <div className="relative h-full overflow-hidden bg-page">
      <motion.div
        {...getHeroBackgroundAnimation(isActive)}
        className={classNames(
          "absolute inset-0 bg-cover",
          "bg-center",
          "lg:bg-top",
        )}
        style={{
          backgroundImage: `url("${movie.backdropUrl}")`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(0, 0, 0, 0.65) 0%,
              rgba(0, 0, 0, 0.25) 45%,
              transparent 85%
            ),
            linear-gradient(
              to top,
              rgba(7, 12, 28, 0.8) 0%,
              rgba(7, 12, 28, 0.2) 35%,
              transparent 65%
            )
          `,
        }}
      />

      <Container className="relative z-10 h-full">
        <motion.div
          {...getHeroContentAnimation(isActive)}
          className={classNames(
            "mx-auto flex h-full w-full max-w-xl flex-col justify-center lg:justify-end",
            "gap-4 pb-20",
            "sm:gap-5 sm:pb-24",
            "md:pb-28",
            "lg:mx-0 lg:max-w-140",
            "2xl:gap-6 2xl:pb-44.75",
          )}
        >
          <HeroMovieInfo movie={movie} />

          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <BuyTicketButton showIcon />
            <Button variant="light">All sessions</Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default HeroSlide;

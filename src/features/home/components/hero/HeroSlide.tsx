import classNames from "classnames";
import { motion } from "framer-motion";

import Container from "@/src/components/layout/Container";
import { Button } from "@/src/components/ui";

import HeroMovieInfo from "./HeroMovieInfo";
import BuyTicketButton from "../shared/BuyTicketButton";
import type { Movie } from "../../../../types/movie.types";
import {
  getHeroBackgroundAnimation,
  getHeroContentAnimation,
} from "@/src/lib/constants/animations/heroAnimations";

interface IHeroSlideProps {
  movie: Movie;
  isActive: boolean;
}

const HeroSlide = ({ movie, isActive }: IHeroSlideProps) => {
  return (
    <div className="relative h-full overflow-hidden">
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
        className={classNames(
          "absolute inset-0",
          "bg-[linear-gradient(90deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,1)_100%)]",
        )}
      />

      <Container className="relative z-10 h-full">
        <motion.div
          {...getHeroContentAnimation(isActive)}
          className={classNames(
            "mx-auto flex h-full w-full max-w-xl flex-col justify-end",
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

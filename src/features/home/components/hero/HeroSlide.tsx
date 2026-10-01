import classNames from "classnames";
import { motion } from "framer-motion";

import Container from "@/src/components/layout/Container";
import Button from "@/src/components/ui/Button";
import { Icon } from "@/src/components/ui/icons";

import { AUTOPLAY_DELAY, SLIDE_SPEED } from "./Hero";
import HeroMovieInfo from "./HeroMovieInfo";
import type { Movie } from "../../types";

interface IHeroSlideProps {
  movie: Movie;
  isActive: boolean;
}

const HeroSlide = ({ movie, isActive }: IHeroSlideProps) => {
  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${movie.backdropUrl}")`,
        }}
        initial={false}
        animate={{
          scale: isActive ? 1.06 : 1,
        }}
        transition={{
          duration: isActive ? AUTOPLAY_DELAY / 1000 + SLIDE_SPEED / 1000 : 0,
          ease: "easeOut",
        }}
      />

      <div
        className={classNames(
          "absolute inset-0",
          "bg-[linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.45)_40%,rgba(0,0,0,0.08)_100%)]",
        )}
      />

      <Container className="relative z-10 h-full">
        <motion.div
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 16,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: isActive ? 0.15 : 0,
          }}
          className="flex h-full max-w-140 flex-col justify-end gap-6 pb-31.25"
        >
          <HeroMovieInfo movie={movie} />

          <div className="flex items-center gap-3">
            <Button variant="primary">
              <Icon type="Movie" className="size-4" />
              Buy tickets
            </Button>

            <Button variant="secondary">All sessions</Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default HeroSlide;

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import { useFeaturedMovies } from "../../hooks/useFeaturedMovies";
import useHeroSlider from "../../hooks/useHeroSlider";

import { HeroSkeleton } from "@/src/components/ui";
import HeroControls from "./HeroControls";
import HeroSlide from "./HeroSlide";
import HeroSection from "./HeroSection";
import HeroError from "./HeroError";
import {
  AUTOPLAY_DELAY,
  SLIDE_SPEED,
} from "@/src/lib/constants/animations/heroAnimations";

const Hero = () => {
  const {
    data: movies = [],
    isLoading,
    isError,
    refetch,
  } = useFeaturedMovies();

  const {
    activeIndex,
    progressKey,
    handleSwiper,
    handleSlideChange,
    handlePrevious,
    handleNext,
    handlePaginationClick,
  } = useHeroSlider();

  if (isLoading) {
    return <HeroSkeleton />;
  }

  if (isError) {
    return <HeroError onRetry={() => refetch()} />;
  }

  if (!movies.length) {
    return null;
  }

  return (
    <HeroSection className="overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={SLIDE_SPEED}
        slidesPerView={1}
        loop={movies.length > 1}
        autoplay={{
          delay: AUTOPLAY_DELAY,
          disableOnInteraction: false,
        }}
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
        className="h-full"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <HeroSlide movie={movie} isActive={index === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>

      {movies.length > 1 && (
        <HeroControls
          movies={movies}
          activeIndex={activeIndex}
          progressKey={progressKey}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onPaginationClick={handlePaginationClick}
        />
      )}
    </HeroSection>
  );
};

export default Hero;

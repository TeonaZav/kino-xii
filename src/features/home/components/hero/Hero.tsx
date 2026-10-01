"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

import { useFeaturedMovies } from "../../hooks/useFeaturedMovies";
import HeroControls from "./HeroControls";
import HeroSlide from "./HeroSlide";

export const AUTOPLAY_DELAY = 6000;
export const SLIDE_SPEED = 800;

const Hero = () => {
  const { data: movies = [], isLoading, isError } = useFeaturedMovies();
  console.log(movies);

  const swiperRef = useRef<SwiperType | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const restartAutoplay = () => {
    const swiper = swiperRef.current;

    if (!swiper) return;

    swiper.autoplay.stop();
    swiper.autoplay.start();
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    setProgressKey((prev) => prev + 1);
  };

  const handlePrevious = () => {
    swiperRef.current?.slidePrev();
    restartAutoplay();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
    restartAutoplay();
  };

  const handlePaginationClick = (index: number) => {
    swiperRef.current?.slideToLoop(index);
    restartAutoplay();
  };

  if (isLoading) {
    return <div className="w-full aspect-1728/760 bg-page" />;
  }

  if (isError || !movies.length) {
    return null;
  }

  return (
    <section className="relative w-full aspect-1728/760 overflow-hidden bg-page">
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
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
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
    </section>
  );
};

export default Hero;

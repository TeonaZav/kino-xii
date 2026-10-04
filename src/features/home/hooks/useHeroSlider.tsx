import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

const useHeroSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const restartAutoplay = () => {
    const swiper = swiperRef.current;

    if (!swiper) return;

    swiper.autoplay.stop();
    swiper.autoplay.start();
  };

  const handleSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
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

  return {
    activeIndex,
    progressKey,
    handleSwiper,
    handleSlideChange,
    handlePrevious,
    handleNext,
    handlePaginationClick,
  };
};

export default useHeroSlider;

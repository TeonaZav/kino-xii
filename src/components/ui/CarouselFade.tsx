import cn from "classnames";

interface ICarouselFadeProps {
  isVisible?: boolean;
  className?: string;
}

const CarouselFade = ({ isVisible = true, className }: ICarouselFadeProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-y-0 right-0 z-50",

        "w-16 md:w-28 lg:w-50",

        "bg-[linear-gradient(90deg,transparent_0%,color-mix(in_srgb,var(--carousel-fade-color,#070c1c)_20%,transparent)_30%,color-mix(in_srgb,var(--carousel-fade-color,#070c1c)_55%,transparent)_60%,color-mix(in_srgb,var(--carousel-fade-color,#040509)_85%,transparent)_85%,var(--carousel-fade-color,#070c1c)_100%)]",
        "transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
};

export default CarouselFade;

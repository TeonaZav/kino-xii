import type { ReactNode } from "react";
import cn from "classnames";

interface IHeroSectionProps {
  children: ReactNode;
  className?: string;
}

const HeroSection = ({ children, className }: IHeroSectionProps) => {
  return (
    <section
      className={cn(
        "relative h-[70svh] min-h-125 max-h-190 w-full",
        "bg-page md:h-[65svh]",
        "lg:aspect-1728/760 lg:h-auto lg:min-h-0 lg:max-h-none",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default HeroSection;

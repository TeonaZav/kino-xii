import { Badge } from "@/src/components/ui";

interface IHeroMovieHeadingProps {
  title: string;
  badgeText?: string;
}

const HeroMovieHeading = ({ title, badgeText }: IHeroMovieHeadingProps) => {
  return (
    <div className="flex flex-col items-center gap-3 lg:items-start">
      {badgeText && <Badge variant="danger">{badgeText}</Badge>}

      <h3 className="text-xl leading-none font-extrabold text-primary uppercase sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[40px]">
        {title}
      </h3>
    </div>
  );
};

export default HeroMovieHeading;

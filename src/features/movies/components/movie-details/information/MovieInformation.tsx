import type { ReactNode } from "react";
import cn from "classnames";

import { SectionHeading, StatusBanner } from "@/src/components/ui";
import type { Movie } from "@/src/types/movie.types";
import { formatFullReleaseDate } from "@/src/lib/utils/formatDate";
import { formatNames } from "@/src/lib/utils/helpers";

interface IInfoItemProps {
  label: string;
  value: ReactNode;
  className?: string;
}

const InfoItem = ({ label, value, className }: IInfoItemProps) => {
  return (
    <div className={cn("font-semibold", className)}>
      <h6 className="text-xs text-secondary uppercase">{label}</h6>
      <p className="text-sm">{value}</p>
    </div>
  );
};

interface IMovieInformationProps {
  movie: Movie;
}

const MovieInformation = ({ movie }: IMovieInformationProps) => {
  const details = [
    { label: "Director", value: movie.director || "—" },
    { label: "Main Cast", value: movie.cast || "—" },
    {
      label: "Duration",
      value: `${movie.runtimeMinutes} minutes`,
    },
    {
      label: "Release Date",
      value: formatFullReleaseDate(movie.releaseDate),
    },
    {
      label: "Formats",
      value: formatNames(movie.formats),
    },
    {
      label: "From",
      value: `₾ ${movie.fromPrice}`,
    },
  ];

  return (
    <section className="flex w-full flex-col gap-4 px-6.5 xl:w-110.25 xl:shrink-0">
      <SectionHeading className="text-xl">Details</SectionHeading>

      {details.map(({ label, value }, index) => (
        <InfoItem key={`${label}_${index}`} label={label} value={value} />
      ))}

      <StatusBanner
        variant="warning"
        title="RATING NOTE"
        description={movie.ageRating.description}
        className="rounded-xl"
        titleClassName="text-xs"
        descriptionClassName="w-full text-warning"
      />
    </section>
  );
};

export default MovieInformation;

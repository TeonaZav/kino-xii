import cn from "classnames";

import { Card } from "@/src/components/ui";
import CardInfo from "./CardInfo";

import type { Movie } from "@/src/types/movie.types";
import ComingSoonPoster from "./ComingSoonPoster";

interface IComingSoonCardProps {
  movie: Movie;
}

const ComingSoonCard = ({ movie }: IComingSoonCardProps) => {
  return (
    <Card
      as="article"
      className={cn(
        "coming-soon-card-size",
        "group relative flex justify-start shrink-0 snap-start gap-3.75 p-3 border border-transparent hover:border-primary/10 hover:scale-100.5 transition-all duration-300",
      )}
    >
      <ComingSoonPoster src={movie.posterUrl} alt={movie.title} />

      <CardInfo movie={movie} />
    </Card>
  );
};

export default ComingSoonCard;

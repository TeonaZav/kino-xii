import { BuyTicketButton } from "@/src/features/shared";
import type { Movie } from "@/src/types/movie.types";

interface ICardFooterProps {
  fromPrice: Movie["fromPrice"];
  movieSlug: Movie["slug"];
}

const CardFooter = ({ fromPrice, movieSlug }: ICardFooterProps) => {
  return (
    <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between">
      <span className="text-xs 2xl:text-sm font-semibold text-primary">
        From ₾ {fromPrice}
      </span>
      <BuyTicketButton movieSlug={movieSlug} className="py-2.5! text-sm" />
    </div>
  );
};
export default CardFooter;

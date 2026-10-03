import type { Movie } from "@/src/types/movie.types";
import BuyTicketButton from "../shared/BuyTicketButton";

interface ICardFooterProps {
  fromPrice: Movie["fromPrice"];
}

const CardFooter = ({ fromPrice }: ICardFooterProps) => {
  return (
    <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between">
      <span className="text-sm font-semibold text-primary">
        From ₾ {fromPrice}
      </span>

      <BuyTicketButton className="py-2.5! text-sm" />
    </div>
  );
};
export default CardFooter;

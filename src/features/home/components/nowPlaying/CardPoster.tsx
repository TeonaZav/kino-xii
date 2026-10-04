import cn from "classnames";

interface IPosterProps {
  src: string;
  alt: string;
  isExpanded: boolean;
}

const CardPoster = ({ src, alt, isExpanded }: IPosterProps) => (
  <div
    className={cn(
      "h-[66.37%] w-full shrink-0 overflow-hidden rounded-[14px]",
      "transition-[height] duration-300 ease-out",
      "group-hover:h-[49.65%]",
      isExpanded && "h-[49.65%]!",
    )}
  >
    <img
      src={src}
      alt={alt}
      className={cn(
        "size-full object-cover",
        "transition-transform duration-300 ease-out",
        "group-hover:scale-[1.03]",
        isExpanded && "scale-[1.03]",
      )}
    />
  </div>
);
export default CardPoster;

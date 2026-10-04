import cn from "classnames";

interface IMovieSynopsisProps {
  synopsis?: string;
  isExpanded?: boolean;
  collapsible?: boolean;
  className?: string;
  textClassName?: string;
}

const DEFAULT_TEXT_CLASSNAME = "line-clamp-1 2xl:line-clamp-2 2xl:line-clamp-3";

const MovieSynopsis = ({
  synopsis,
  isExpanded = false,
  collapsible = true,
  className,
  textClassName = DEFAULT_TEXT_CLASSNAME,
}: IMovieSynopsisProps) => {
  if (!synopsis) return null;

  return (
    <div
      title={synopsis}
      className={cn(
        "cursor-default text-xs 2xl:text-sm leading-[130%]",
        collapsible && [
          "overflow-hidden opacity-0",
          "transition-opacity duration-300 ease-out",
          "group-hover:opacity-100",
          isExpanded && "opacity-100",
        ],
        className,
      )}
    >
      <p className={textClassName}>{synopsis}</p>
    </div>
  );
};

export default MovieSynopsis;

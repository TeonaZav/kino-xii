import cn from "classnames";

interface IMovieSynopsisProps {
  synopsis?: string;
  isExpanded?: boolean;
  collapsible?: boolean;
  className?: string;
  textClassName?: string;
}

const DEFAULT_TEXT_CLASSNAME =
  "line-clamp-3 text-sm leading-[130%] text-secondary 2xl:line-clamp-4";

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
        "cursor-default",
        collapsible && [
          "max-h-0 overflow-hidden opacity-0",
          "transition-[max-height,opacity] duration-300 ease-out",
          "group-hover:max-h-24 group-hover:opacity-100",
          isExpanded && "max-h-24 opacity-100",
        ],
        className,
      )}
    >
      <p className={textClassName}>{synopsis}</p>
    </div>
  );
};

export default MovieSynopsis;

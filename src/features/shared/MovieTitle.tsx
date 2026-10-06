import cn from "classnames";

interface IMovieTitleProps {
  title: string;
  className?: string;
}

const MovieTitle = ({ title, className }: IMovieTitleProps) => {
  return (
    <h3
      title={title}
      className={cn("line-clamp-1 min-w-0 text-primary", className)}
    >
      {title}
    </h3>
  );
};

export default MovieTitle;

import cn from "classnames";

interface IComingSoonPosterProps {
  src: string;
  alt: string;
}

const ComingSoonPoster = ({ src, alt }: IComingSoonPosterProps) => (
  <figure
    className={cn("h-full w-[48.72%] shrink-0 overflow-hidden rounded-[14px]")}
  >
    <img src={src} alt={alt} className={cn("size-full object-cover")} />
  </figure>
);
export default ComingSoonPoster;

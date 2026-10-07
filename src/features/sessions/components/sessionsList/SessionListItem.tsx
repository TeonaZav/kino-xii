import type { ReactNode } from "react";
import SessionHeader from "./SessionHeader";
import type { Movie } from "@/src/types/movie.types";

interface ISessionListItemProps {
  movie: Movie;
  children: ReactNode;
}

const SessionListItem = ({ movie, children }: ISessionListItemProps) => {
  return (
    <li className="flex min-w-0 flex-col gap-3.5 border-b border-raised py-8 first:pt-0 list-none">
      <SessionHeader movie={movie} />

      <div className="min-w-0 overflow-hidden">{children}</div>
    </li>
  );
};

export default SessionListItem;

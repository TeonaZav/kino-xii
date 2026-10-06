import type { MovieSessions } from "@/src/types/session.types";

import SessionCarousel from "./SessionSlider";
import SessionListItem from "./SessionListItem";

interface ISessionListProps {
  movies: MovieSessions[];
}

const SessionList = ({ movies }: ISessionListProps) => {
  return (
    <ul className="flex min-w-0 flex-col">
      {movies.map((movieSessions) => (
        <SessionListItem
          key={movieSessions.movie.id}
          movie={movieSessions.movie}
        >
          <SessionCarousel sessions={movieSessions.sessions} />
        </SessionListItem>
      ))}
    </ul>
  );
};

export default SessionList;

import { useQuery } from "@tanstack/react-query";

import { getMovieSessions } from "@/src/lib/api/movies";
import { QUERY_KEYS } from "@/src/lib/constants/queryKeys";

export const useMovieSessionsData = (movieId: string, date: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.sessions(movieId, date),
    queryFn: () => getMovieSessions(movieId, date),
    enabled: Boolean(movieId && date),
  });
};

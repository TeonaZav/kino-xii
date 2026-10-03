import { useQuery } from "@tanstack/react-query";

import { getNowPlayingMovies } from "@/src/lib/api/movies";
import { QUERY_KEYS } from "@/src/lib/constants/queryKeys";

export const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.nowPlaying,
    queryFn: getNowPlayingMovies,
  });
};

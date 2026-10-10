import { useQuery } from "@tanstack/react-query";

import { getMovieDetails } from "@/src/lib/api/movies";
import { QUERY_KEYS } from "@/src/lib/constants/queryKeys";

export const useMovieDetailsData = (movieId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.detail(movieId),
    queryFn: () => getMovieDetails(movieId),
    enabled: Boolean(movieId),
  });
};

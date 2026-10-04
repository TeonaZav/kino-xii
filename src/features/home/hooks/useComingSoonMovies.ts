import { useQuery } from "@tanstack/react-query";

import { getComingSoonMovies } from "@/src/lib/api/movies";
import { QUERY_KEYS } from "@/src/lib/constants/queryKeys";

export const useComingSoonMovies = () => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.comingSoon,
    queryFn: getComingSoonMovies,
  });
};

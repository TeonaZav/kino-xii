import { useQuery } from "@tanstack/react-query";
import { getFeaturedMovies } from "@/src/lib/api/movies";
import { QUERY_KEYS } from "@/src/lib/constants/queryKeys";

export const useFeaturedMovies = () => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.featured,
    queryFn: getFeaturedMovies,
  });
};

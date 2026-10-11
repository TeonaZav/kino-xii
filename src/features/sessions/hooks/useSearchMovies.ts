"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/src/lib/api/movies";

export const useSearchMovies = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const searchQuery = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    staleTime: 60_000,
  });

  return {
    ...searchQuery,
    isDebouncing: query.trim() !== debouncedQuery,
  };
};

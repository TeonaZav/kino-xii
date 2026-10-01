export const QUERY_KEYS = {
  movies: {
    all: ["movies"] as const,
    featured: ["movies", "featured"] as const,
    nowPlaying: ["movies", "now-playing"] as const,
    comingSoon: ["movies", "coming-soon"] as const,
    detail: (movieId: number) => ["movies", movieId] as const,
  },
};

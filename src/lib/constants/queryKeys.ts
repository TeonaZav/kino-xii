import type { SessionFilters } from "@/src/types/session.types";
import { TicketFilter } from "@/src/types/ticket.types";

export const QUERY_KEYS = {
  movies: {
    all: ["movies"] as const,
    featured: ["movies", "featured"] as const,
    nowPlaying: ["movies", "now-playing"] as const,
    comingSoon: ["movies", "coming-soon"] as const,

    detail: (movieId: string | number) =>
      ["movies", "detail", String(movieId)] as const,

    sessions: (movieId: string | number, date: string) =>
      ["movies", "detail", String(movieId), "sessions", date] as const,
  },

  sessions: {
    all: ["sessions"] as const,

    list: (filters: SessionFilters) => ["sessions", "list", filters] as const,

    filterOptions: ["sessions", "filter-options"] as const,
  },

  auth: {
    all: ["auth"] as const,
    login: ["auth", "login"] as const,
    register: ["auth", "register"] as const,
    logout: ["auth", "logout"] as const,
    user: ["auth", "user"] as const,
  },

  booking: {
    all: ["booking"] as const,

    sessionSeats: (sessionId: number) =>
      ["booking", "session-seats", sessionId] as const,
  },

  tickets: {
    all: ["tickets"] as const,

    list: (filter: TicketFilter) => ["tickets", "list", filter] as const,
  },

  profile: {
    all: ["profile"] as const,
    me: ["profile", "me"] as const,
  },
};

import type {
  MovieSessions,
  SessionFilterOptions,
  SessionFilters,
  SessionsResponse,
} from "@/src/types/session.types";

import api from "./client";

export const getSessions = async (
  filters: SessionFilters,
): Promise<SessionsResponse> => {
  const { data } = await api.get<SessionsResponse>("/sessions", {
    params: filters,
    paramsSerializer: {
      indexes: false,
    },
  });

  return data;
};

export const getMovieSessions = async (
  movieId: number,
  date?: string,
): Promise<MovieSessions> => {
  const { data } = await api.get(`/movies/${movieId}/sessions`, {
    params: date ? { date } : undefined,
  });

  return data.data;
};

export const getSessionFilterOptions =
  async (): Promise<SessionFilterOptions> => {
    const { data } = await api.get("/filter-options");

    return data.data;
  };

import { FeaturedMoviesResponse } from "@/src/features/home/types";
import api from "./client";

export const searchMovies = async (query: string) => {
  const { data } = await api.get("/search", {
    params: {
      q: query,
    },
  });

  return data;
};

export const getNowPlayingMovies = async () => {
  const { data } = await api.get("/movies/now-playing");

  return data;
};

export const getComingSoonMovies = async () => {
  const { data } = await api.get("/movies/coming-soon");

  return data;
};

export const getFeaturedMovies = async () => {
  const { data } = await api.get<FeaturedMoviesResponse>("/movies/featured");

  return data.data;
};

export const getMovie = async (movieId: number) => {
  const { data } = await api.get(`/movies/${movieId}`);

  return data;
};

export const getMovieSessions = async (movieId: number, date?: string) => {
  const { data } = await api.get(`/movies/${movieId}/sessions`, {
    params: date ? { date } : undefined,
  });

  return data;
};

export const notifyMovie = async (movieId: number) => {
  const { data } = await api.post(`/movies/${movieId}/notify`);

  return data;
};

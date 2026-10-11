import {
  FeaturedMoviesResponse,
  Movie,
  SearchResponse,
} from "@/src/types/movie.types";
import api from "./client";
import { VenueSessionsResponse } from "@/src/types/session.types";

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await api.get<SearchResponse>("/search", {
    params: { q: query },
  });

  return data.data;
};

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const { data } = await api.get("/movies/now-playing");

  return data.data;
};
export const getComingSoonMovies = async (): Promise<Movie[]> => {
  const { data } = await api.get("/movies/coming-soon");

  return data.data;
};

export const getFeaturedMovies = async () => {
  const { data } = await api.get<FeaturedMoviesResponse>("/movies/featured");

  return data.data;
};

export const getMovie = async (movieId: number) => {
  const { data } = await api.get(`/movies/${movieId}`);

  return data.data;
};

export const notifyMovie = async (movieSlug: string) => {
  const { data } = await api.post(
    `/movies/${encodeURIComponent(movieSlug)}/notify`,
  );

  return data.data;
};

export const getMovieDetails = async (movieId: string) => {
  const { data } = await api.get(`/movies/${movieId}`);

  return data.data;
};

export const getMovieSessions = async (movieId: string, date: string) => {
  const { data } = await api.get<VenueSessionsResponse>(
    `/movies/${movieId}/sessions`,
    {
      params: { date },
    },
  );

  return data.data;
};

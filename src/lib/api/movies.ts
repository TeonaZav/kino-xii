import { FeaturedMoviesResponse, Movie } from "@/src/types/movie.types";
import api from "./client";

export const searchMovies = async (query: string) => {
  const { data } = await api.get("/search", {
    params: {
      q: query,
    },
  });

  return data;
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



export const notifyMovie = async (movieId: number) => {
  const { data } = await api.post(`/movies/${movieId}/notify`);

  return data.data;
};

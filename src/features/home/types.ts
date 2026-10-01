export interface Genre {
  id: number;
  slug: string;
  name: string;
}

export interface MovieFormat {
  id: number;
  slug: string;
  name: string;
  priceUplift: number;
}

export interface AgeRating {
  code: string;
  minAge: number;
  description: string;
}

export interface Movie {
  id: number;
  slug: string;
  title: string;
  kind: string;
  runtimeMinutes: number;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  isComingSoon: boolean;
  isNotified: boolean;
  isFeatured: boolean;
  fromPrice: number;
  ageRating: AgeRating;
  genres: Genre[];
  formats: MovieFormat[];
}

export interface FeaturedMoviesResponse {
  data: Movie[];
}

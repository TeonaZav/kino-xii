import type { AgeRating } from "./common";
import type { Movie, MovieFormat } from "./movie.types";

export type SessionBand = "morning" | "afternoon" | "evening";

export type SessionSort =
  "time_asc" | "time_desc" | "price_asc" | "price_desc" | "title_asc";

export type SessionFormat = {
  id: number;
  slug: string;
  name: string;
  priceUplift: number;
};

export type SessionVenue = {
  id: number;
  slug: string;
  name: string;
  city: string;
  formats?: SessionFormat[];
};

export type Hall = {
  id: number;
  name: string;
  venue: SessionVenue;
};

export type SessionLanguage = {
  id: number;
  slug: string;
  name: string;
  code: string;
};

export type Session = {
  id: number;
  startsAt: string;
  date: string;
  time: string;
  timeBand: SessionBand;
  price: number;
  seatsLeft: number;
  isSoldOut: boolean;
  hall: Hall;
  venue: SessionVenue;
  format: MovieFormat;
  language: SessionLanguage;
  movie: Movie;
};

export type MovieSessions = {
  movie: Movie;
  sessions: Session[];
};

export type SessionMeta = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  totalSessions: number;
  totalMovies: number;
  date: string;
};

export type SessionsResponse = {
  data: MovieSessions[];
  meta: SessionMeta;
};

export interface SessionFilters {
  date?: string;
  venues?: string[];
  formats?: string[];
  languages?: string[];
  bands?: SessionBand[];
  search?: string;
  sort?: SessionSort;
  page?: number;
}

export type SessionTimeBand = {
  id: SessionBand;
  label: string;
};

export type SessionVenueOption = {
  id: number;
  slug: string;
  name: string;
  city: string;
  formats: SessionFormat[];
};

export type SessionSortOption = {
  id: SessionSort;
  label: string;
};

export type TicketType = {
  id: number;
  slug: string;
  name: string;
  priceRatio: number;
  note: string | null;
  blockedFromRatingAge: number | null;
};

export type SessionFilterOptions = {
  venues: SessionVenueOption[];
  formats: SessionFormat[];
  languages: SessionLanguage[];
  timeBands: SessionTimeBand[];
  sorts: SessionSortOption[];
  ticketTypes: TicketType[];
  ageRatings: AgeRating[];
  maxSeatsPerOrder: number;
  holdMinutes: number;
};

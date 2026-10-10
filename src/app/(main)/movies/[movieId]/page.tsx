import MovieDetails from "@/src/features/movies/components/movie-details/MovieDetails";

interface IMovieDetailsPageProps {
  params: Promise<{
    movieId: string;
  }>;
}

export default async function MovieDetailsPage({
  params,
}: IMovieDetailsPageProps) {
  const { movieId } = await params;

  return <MovieDetails movieId={movieId} />;
}

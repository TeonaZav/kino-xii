import MovieSessions from "@/src/features/movies/components/MovieSessions";

interface IMovieDetailsPageProps {
  params: Promise<{
    movieId: string;
  }>;
}

export default async function MovieDetailsPage({
  params,
}: IMovieDetailsPageProps) {
  const { movieId } = await params;

  return <MovieSessions />;
}

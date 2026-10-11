"use client";

import { useEffect, useState } from "react";

import { useNotifyMovie } from "../../../hooks/useNotifyMovie";
import useAuth from "@/src/features/auth/hooks/useAuth";

import type { Movie } from "@/src/types/movie.types";

import { Badge, Button, Icon } from "@/src/components/ui";
import { formatReleaseDateLabel } from "@/src/lib/utils/formatDate";

interface ICardInfoProps {
  movie: Movie;
}

const CardInfo = ({ movie }: ICardInfoProps) => {
  const { requireAuth, isAuthLoading } = useAuth();
  const { mutate: notify, isPending } = useNotifyMovie();
  console.log(movie);
  const [isNotified, setIsNotified] = useState(movie.isNotified);

  useEffect(() => {
    setIsNotified(movie.isNotified);
  }, [movie.id, movie.isNotified]);

  const handleNotify = () => {
    if (isAuthLoading || isPending || isNotified) return;
    console.log(movie.slug);
    requireAuth(() => {
      notify(movie.slug, {
        onSuccess: () => {
          setIsNotified(true);
        },
      });
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-between gap-2">
      <div className="flex flex-col gap-1.75">
        <p className="text-xs font-extrabold text-red uppercase">
          {formatReleaseDateLabel(movie.releaseDate)}
        </p>

        <h4 className="text-xs leading-none font-extrabold text-primary">
          {movie.title}
        </h4>

        <p className="text-xs leading-[130%] text-secondary">
          {movie.genres[0]?.name} · {movie.runtimeMinutes} min
        </p>

        <Badge variant="danger" className="px-2 py-1">
          {movie.ageRating.code}
        </Badge>
      </div>

      <Button
        variant="outline"
        disabled={isPending || isAuthLoading || isNotified}
        onClick={handleNotify}
        className="w-max px-3! py-1.5! text-xs! text-primary"
      >
        <Icon type="Bell" className="size-4" />

        {isPending
          ? "Loading..."
          : isNotified
            ? "Notification Enabled"
            : "Notify Me"}
      </Button>
    </div>
  );
};

export default CardInfo;

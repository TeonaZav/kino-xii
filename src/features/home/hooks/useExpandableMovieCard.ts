import { useState } from "react";

const useExpandableMovieCard = () => {
  const [expandedMovieId, setExpandedMovieId] = useState<number | null>(null);

  const handleCardClick = (movieId: number) => {
    const isTouchDevice = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;

    if (!isTouchDevice) return;

    setExpandedMovieId((currentId) => (currentId === movieId ? null : movieId));
  };

  return {
    expandedMovieId,
    handleCardClick,
  };
};

export default useExpandableMovieCard;

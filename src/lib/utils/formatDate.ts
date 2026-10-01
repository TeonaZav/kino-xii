export const formatReleaseDate = (date: string): string => {
  const parsedDate = new Date(`${date}T00:00:00`);

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};

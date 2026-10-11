export const formatReleaseDate = (date: string): string => {
  const parsedDate = new Date(`${date}T00:00:00`);

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};

export const formatReleaseDateLabel = (date: string): string => {
  const parsedDate = new Date(`${date}T00:00:00`);

  const day = parsedDate.getDate();

  const month = parsedDate
    .toLocaleString("en-US", { month: "long" })
    .toUpperCase();

  return `IN CINEMAS ${day} ${month}`;
};

export const formatFullReleaseDate = (date: string): string => {
  const parsedDate = new Date(`${date}T00:00:00`);

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatBookingModalDate = (date: string): string => {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${date}T12:00:00`));
};

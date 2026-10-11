const parseDate = (date: string): Date => {
  return new Date(`${date}T12:00:00`);
};

export const formatReleaseDate = (date: string): string => {
  return parseDate(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};

export const formatReleaseDateLabel = (date: string): string => {
  const parsedDate = parseDate(date);

  const day = parsedDate.getDate();

  const month = parsedDate
    .toLocaleDateString("en-US", { month: "long" })
    .toUpperCase();

  return `IN CINEMAS ${day} ${month}`;
};

export const formatFullReleaseDate = (date: string): string => {
  return parseDate(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatBookingModalDate = (date: string): string => {
  return parseDate(date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};

export const formatSessionDate = (date: string, time: string): string => {
  const formattedDate = parseDate(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return `${formattedDate} · ${time}`;
};

export const formatRefundDeadline = (startsAt: string): string => {
  const deadline = new Date(new Date(startsAt).getTime() - 2 * 60 * 60 * 1000);

  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Asia/Tbilisi",
  }).format(deadline);

  const date = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Asia/Tbilisi",
  }).format(deadline);

  return `${time}, ${date}`;
};

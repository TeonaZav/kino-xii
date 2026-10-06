export const getNextSevenDays = () => {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();

    date.setDate(date.getDate() + index);

    return {
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      date: date.getDate(),
      value: [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-"),
    };
  });
};

export const getTodayDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const parseTimeBandLabel = (label: string) => {
  const match = label.match(/^(.+?)\s*\((.+)\)$/);

  if (!match) {
    return {
      title: label,
      description: "",
    };
  }

  return {
    title: match[1],
    description: match[2],
  };
};

import type { HallSection } from "@/src/types/booking.types";

export const getHallSectionLabel = (section: HallSection): string => {
  const firstRow = section.rows[0]?.label;
  const lastRow = section.rows.at(-1)?.label;

  if (!firstRow) return section.name;

  return `${section.name} · Rows ${firstRow}–${lastRow}`;
};

const STORAGE_KEY = "kino-xii:active-booking";

export interface StoredBooking {
  holdId: string;
  sessionId: number;
  sessionDate: string;
  movieId: string;
  userId: string;
}

export const getStoredBooking = (): StoredBooking | null => {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const value: unknown = JSON.parse(raw);

    if (
      !value ||
      typeof value !== "object" ||
      !("holdId" in value) ||
      !("sessionId" in value) ||
      !("movieId" in value) ||
      !("userId" in value) ||
      typeof value.holdId !== "string" ||
      typeof value.sessionId !== "number" ||
      typeof value.movieId !== "string" ||
      typeof value.userId !== "string"
    ) {
      clearStoredBooking();
      return null;
    }

    return value as StoredBooking;
  } catch {
    clearStoredBooking();
    return null;
  }
};

export const saveStoredBooking = (booking: StoredBooking): void => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
};

export const clearStoredBooking = (): void => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
};

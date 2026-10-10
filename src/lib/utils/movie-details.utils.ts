import type { Session } from "@/src/types/session.types";

export interface GroupedSessionHall {
  id: number;
  name: string;
  sessions: Session[];
}

export const groupSessionsByHall = (
  sessions: Session[],
): GroupedSessionHall[] => {
  const halls = new Map<number, GroupedSessionHall>();

  sessions.forEach((session) => {
    const { id, name } = session.hall;

    const existingHall = halls.get(id);

    if (existingHall) {
      existingHall.sessions.push(session);
      return;
    }

    halls.set(id, {
      id,
      name,
      sessions: [session],
    });
  });

  return Array.from(halls.values());
};

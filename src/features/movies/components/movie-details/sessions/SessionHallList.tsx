import { useMemo } from "react";

import type { Session } from "@/src/types/session.types";

import SessionHall from "./SessionHall";
import { groupSessionsByHall } from "@/src/lib/utils/movie-details.utils";

interface ISessionHallListProps {
  sessions: Session[];
  onSessionSelect: (session: Session) => void;
}

const SessionHallList = ({
  sessions,
  onSessionSelect,
}: ISessionHallListProps) => {
  const halls = useMemo(() => groupSessionsByHall(sessions), [sessions]);

  return (
    <div className="flex flex-wrap gap-2">
      {halls.map((hall) => (
        <SessionHall
          key={hall.id}
          hallName={hall.name}
          sessions={hall.sessions}
          onSessionSelect={onSessionSelect}
        />
      ))}
    </div>
  );
};

export default SessionHallList;

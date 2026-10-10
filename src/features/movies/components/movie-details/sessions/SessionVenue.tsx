import type { Session } from "@/src/types/session.types";
import SessionHallList from "./SessionHallList";

interface ISessionVenueProps {
  name: string;
  sessions: Session[];
  onSessionSelect: (session: Session) => void;
}

const SessionVenue = ({
  name,
  sessions,
  onSessionSelect,
}: ISessionVenueProps) => {
  return (
    <li className="flex flex-col gap-3">
      <h4 className="text-sm font-extrabold">{name}</h4>

      <SessionHallList sessions={sessions} onSessionSelect={onSessionSelect} />
    </li>
  );
};

export default SessionVenue;

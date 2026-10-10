
import { Card } from "@/src/components/ui";

import type { Session } from "@/src/types/session.types";

import SessionTimeButton from "./SessionTimeCard";

interface ISessionHallProps {
  hallName: string;
  sessions: Session[];
  onSessionSelect: (session: Session) => void;
}

const SessionHall = ({
  hallName,
  sessions,
  onSessionSelect,
}: ISessionHallProps) => {
  return (
    <Card className="flex min-w-70 max-w-max flex-col gap-2 rounded-2xl bg-card p-3.75">
      <h5 className="text-xs text-primary">Hall {hallName}</h5>

      <ul className="flex flex-wrap gap-2">
        {sessions.map((session) => (
          <li key={session.id}>
            <SessionTimeButton session={session} onSelect={onSessionSelect} />
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default SessionHall;

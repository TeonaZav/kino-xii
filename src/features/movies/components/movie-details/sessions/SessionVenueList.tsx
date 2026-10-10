import type { MovieVenuesList, Session } from "@/src/types/session.types";

import SessionVenue from "./SessionVenue";

interface ISessionVenueListProps {
  venues: MovieVenuesList[];
  onSessionSelect: (session: Session) => void;
}

const SessionVenueList = ({
  venues,
  onSessionSelect,
}: ISessionVenueListProps) => {
  if (!venues.length) {
    return (
      <div className="rounded-xl bg-card px-6 py-10 text-center">
        <p className="text-sm text-secondary">
          No sessions available for this date.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-6">
      {venues.map(({ venue, sessions }) => (
        <SessionVenue
          key={venue.id}
          name={venue.name}
          sessions={sessions}
          onSessionSelect={onSessionSelect}
        />
      ))}
    </ul>
  );
};

export default SessionVenueList;

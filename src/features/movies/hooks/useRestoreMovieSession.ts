import { useEffect, useRef } from "react";

import type { Session } from "@/src/types/session.types";

interface IUseRestoreMovieSessionProps {
  sessions: Session[];
  restoreSessionId?: number | null;
  restoreDate?: string | null;
  selectedDate: string;
  isReady: boolean;
  onSessionRestored?: (session: Session) => void;
}

export const useRestoreMovieSession = ({
  sessions,
  restoreSessionId,
  restoreDate,
  selectedDate,
  isReady,
  onSessionRestored,
}: IUseRestoreMovieSessionProps) => {
  const restoredSessionRef = useRef<number | null>(null);

  useEffect(() => {
    if (restoreSessionId == null) {
      restoredSessionRef.current = null;
      return;
    }

    if (
      !isReady ||
      !restoreDate ||
      selectedDate !== restoreDate ||
      restoredSessionRef.current === restoreSessionId
    ) {
      return;
    }

    const restoredSession = sessions.find(
      (session) => session.id === restoreSessionId,
    );

    if (!restoredSession) return;

    restoredSessionRef.current = restoreSessionId;

    onSessionRestored?.(restoredSession);
  }, [
    sessions,
    restoreSessionId,
    restoreDate,
    selectedDate,
    isReady,
    onSessionRestored,
  ]);
};

import { useEffect, useState } from "react";

import { getRemainingSeconds } from "@/src/lib/utils/formatTime";

interface UseBookingExpirationProps {
  expiresAt: string | null;
  initialRemainingSeconds: number;
  onExpire: () => void;
  isBusy: () => boolean;
  isMounted: () => boolean;
}

export const useBookingExpiration = ({
  expiresAt,
  initialRemainingSeconds,
  onExpire,
  isBusy,
  isMounted,
}: UseBookingExpirationProps) => {
  const [remainingSeconds, setRemainingSeconds] = useState(
    initialRemainingSeconds,
  );

  useEffect(() => {
    if (!expiresAt) return;

    const tick = () => {
      const seconds = getRemainingSeconds(expiresAt);

      if (isMounted()) {
        setRemainingSeconds(seconds);
      }

      if (seconds === 0 && !isBusy()) {
        onExpire();
      }
    };

    tick();

    const interval = window.setInterval(tick, 1000);

    return () => window.clearInterval(interval);
  }, [expiresAt, onExpire, isBusy, isMounted]);

  return {
    remainingSeconds,
    setRemainingSeconds,
  };
};

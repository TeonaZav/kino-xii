"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const useDebouncedFieldError = (
  value: string,
  error: string | undefined,
  delay = 500,
) => {
  const [showError, setShowError] = useState(false);

  const revealError = useDebouncedCallback(() => {
    setShowError(true);
  }, delay);

  useEffect(() => {
    revealError.cancel();
    setShowError(false);

    if (!value) return;

    revealError();

    return () => {
      revealError.cancel();
    };
  }, [value, revealError]);

  return showError ? error : undefined;
};

export default useDebouncedFieldError;

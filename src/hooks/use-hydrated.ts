import { useEffect, useState } from "react";

// Returns true only after the first client render, so it's safe to use
// browser-only APIs (Intl.RelativeTimeFormat, toLocaleString, Date.now())
// without hydration mismatches.
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

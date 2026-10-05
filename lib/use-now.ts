"use client";

import { useEffect, useState } from "react";

/**
 * Aktuelle Zeit, erst nach dem Mount gesetzt (vermeidet Hydration-Mismatch).
 * Zum Testen: ?now=2026-10-06T14:20 simuliert einen anderen Zeitpunkt.
 */
export function useNow(intervalMs = 30_000) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const override = new URLSearchParams(window.location.search).get("now");
    const parsed = override ? new Date(override).getTime() : NaN;
    const offset = Number.isNaN(parsed) ? 0 : parsed - Date.now();
    const tick = () => setNow(new Date(Date.now() + offset));
    tick();
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}

export type Phase = "past" | "live" | "upcoming";

export function phaseOf(event: EventItem, now: Date | null): Phase {
  if (!now) return "upcoming";
  if (event.end <= now) return "past";
  if (event.start <= now) return "live";
  return "upcoming";
}

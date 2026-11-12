"use server";
import { getEvents } from "@/app/_actions/event";

/** Nächste Seite für den Kalender. Öffentlich aufrufbar, darum nur die Seitenzahl. */
export async function loadEventsPage(page: number) {
  if (!Number.isInteger(page) || page < 1 || page > 10_000) {
    return { events: [], nextCursor: null, failed: true };
  }
  return getEvents({ page });
}

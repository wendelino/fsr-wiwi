import { getEvents } from "@/app/_actions/event";
import { ERSTI_TAG } from "@/lib/ersti";
import { Metadata } from "next";
import { berlinDateKey } from "../_designs/berlin";
import ErstiView from "./ersti-view";

// Zusammengeführter Entwurf – nicht indexieren
export const metadata: Metadata = {
  title: "Ersti-Woche · Neu",
  robots: { index: false, follow: false },
};

export default async function page() {
  const { events } = await getEvents({ tag: ERSTI_TAG, limit: 100 });
  // Tag zum Render-Zeitpunkt, damit der heutige Tag schon im HTML ausgewählt ist
  return <ErstiView events={events} renderDayKey={berlinDateKey(new Date())} />;
}

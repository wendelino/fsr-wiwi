import { getEvents } from "@/app/_actions/event";
import { berlinDateKey } from "@/lib/berlin";
import { ERSTI_START, ERSTI_TAG } from "@/lib/ersti";
import { Metadata } from "next";
import ErstiView from "./ersti-view";

const description = `Programm, Anmeldung und alle Infos zur Ersti-Woche ${ERSTI_START.slice(0, 4)} des FSR WiWi`;

export const metadata: Metadata = {
  title: "Ersti-Woche",
  description,
  openGraph: { title: "Ersti-Woche", description },
  twitter: { title: "Ersti-Woche", description },
};

export default async function page() {
  const { events } = await getEvents({ tag: ERSTI_TAG, limit: 100 });
  // Tag zum Render-Zeitpunkt, damit der heutige Tag schon im HTML ausgewählt ist
  return <ErstiView events={events} renderDayKey={berlinDateKey(new Date())} />;
}

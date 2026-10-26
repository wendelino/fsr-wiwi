import { getEvents } from "@/app/_actions/event";
import { berlinDateKey } from "@/lib/berlin";
import { ERSTI_PAGE, ERSTI_START, ERSTI_TAG } from "@/lib/ersti";
import { pageMetadata } from "@/lib/metadata";
import ErstiView from "./ersti-view";

const description = `Programm, Anmeldung und alle Infos zur Ersti-Woche ${ERSTI_START.slice(0, 4)} des FSR WiWi`;

export const metadata = pageMetadata({ title: "Ersti-Woche", description, path: ERSTI_PAGE });

export default async function page() {
  const { events } = await getEvents({ tag: ERSTI_TAG, limit: 100 });
  // Tag zum Render-Zeitpunkt, damit der heutige Tag schon im HTML ausgewählt ist
  return <ErstiView events={events} renderDayKey={berlinDateKey(new Date())} />;
}

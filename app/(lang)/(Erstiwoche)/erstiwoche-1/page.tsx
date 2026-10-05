import { getEvents } from "@/app/_actions/event";
import { ERSTI_TAG } from "@/lib/ersti";
import { Metadata } from "next";
import AgendaView from "./agenda-view";

// Design-Entwurf 1 – nicht indexieren
export const metadata: Metadata = {
  title: "Ersti-Woche · Entwurf 1",
  robots: { index: false, follow: false },
};

export default async function page() {
  const { events } = await getEvents({ tag: ERSTI_TAG, limit: 100 });
  return <AgendaView events={events} />;
}

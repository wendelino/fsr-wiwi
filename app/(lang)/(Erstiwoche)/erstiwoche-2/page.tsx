import { getEvents } from "@/app/_actions/event";
import { ERSTI_TAG } from "@/lib/ersti";
import { Metadata } from "next";
import FestivalView from "./festival-view";

// Design-Entwurf 2 – nicht indexieren
export const metadata: Metadata = {
  title: "Ersti-Woche · Entwurf 2",
  robots: { index: false, follow: false },
};

export default async function page() {
  const { events } = await getEvents({ tag: ERSTI_TAG, limit: 100 });
  return <FestivalView events={events} />;
}

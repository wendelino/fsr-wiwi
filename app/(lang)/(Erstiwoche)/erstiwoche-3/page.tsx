import { getEvents } from "@/app/_actions/event";
import { ERSTI_TAG } from "@/lib/ersti";
import { Metadata } from "next";
import DashboardView from "./dashboard-view";

// Design-Entwurf 3 – nicht indexieren
export const metadata: Metadata = {
  title: "Ersti-Woche · Entwurf 3",
  robots: { index: false, follow: false },
};

export default async function page() {
  const { events } = await getEvents({ tag: ERSTI_TAG, limit: 100 });
  return <DashboardView events={events} />;
}

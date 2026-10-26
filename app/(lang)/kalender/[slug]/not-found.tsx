import { EventNotFound } from "@/components/events/event-header";

export default function NotFound() {
  return <EventNotFound back={{ href: "/kalender", label: "Alle Termine" }} />;
}

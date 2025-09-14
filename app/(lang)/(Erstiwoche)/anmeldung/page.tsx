import { getEvents } from "@/app/_actions/event";
import { SelectEventForm } from "@/components/forms/select-event-form";
import { Header } from "@/components/TextComponents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anmeldung",
  description: "Anmelden für Veranstaltungen der Ersti-Woche 2025",
  openGraph: {
    url: "https://fsr-wiwi-halle.de/anmeldung",
    type: "website",
    title: "Anmeldung",
    description: "Anmelden für Veranstaltungen der Ersti-Woche 2025",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anmeldung",
    description: "Anmelden für Veranstaltungen der Ersti-Woche 2025",
  },
};

export default async function page() {
  const { events } = await getEvents({
    filter: { registrable: true },
    limit: 100,
    tag: "ersti25",
  });

  return (
    <div className="flex flex-col items-center">
      <Header>Anmeldung</Header>
      <SelectEventForm events={events} />
    </div>
  );
}

import { getEvents } from "@/app/_actions/event";
import { SelectEventForm } from "@/components/forms/select-event-form";
import { InfoCard } from "@/components/info-card";
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
    <div className="flex flex-col items-center  gap-4">
      <Header>Anmeldung</Header>
      <SelectEventForm events={events} />
      <InfoCard type="warning">
        Da wir nur eine begrenzte Anzahl an Plätzen haben, versuchen wir diese
        möglichst fair zu verteilen. Am Montag (6.10) um 15 Uhr werden die
        Anmeldungen geschlossen und die Plätze im Losverfahren verteilt. Du
        bekommst dann eine E-Mail mit einer Zu- oder Absage für deine
        Anmeldungen. Wir bitten um Verständnis, dass wir nicht alle Anmeldungen
        annehmen können.
      </InfoCard>
    </div>
  );
}

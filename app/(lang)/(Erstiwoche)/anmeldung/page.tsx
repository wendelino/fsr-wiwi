import { getEvents } from "@/app/_actions/event";
import { HeroLead, PageHero } from "@/components/page-hero";
import { SignupCard } from "@/components/events/signup-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Anmeldung",
  description: "Anmelden für Veranstaltungen des FSR WiWi und der Ersti-Woche",
  openGraph: {
    url: "https://fsr-wiwi-halle.de/anmeldung",
    type: "website",
    title: "Anmeldung",
    description: "Anmelden für Veranstaltungen des FSR WiWi und der Ersti-Woche",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anmeldung",
    description: "Anmelden für Veranstaltungen des FSR WiWi und der Ersti-Woche",
  },
};

export default async function page() {
  const { events } = await getEvents({
    filter: { registrable: true, upcoming: true },
    limit: 100,
  });
  const now = new Date();
  const sorted = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());

  return (
    <>
      <PageHero eyebrow="Plätze begrenzt" title="Anmeldung" poster>
        <HeroLead>
          Für diese Termine braucht ihr eine Anmeldung. Bei manchen werden die
          Plätze verlost – dort könnt ihr euch auch noch anmelden, wenn alle
          Plätze vergeben sind.
        </HeroLead>
      </PageHero>

      {sorted.length === 0 ? (
        <Reveal className="rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
          Gerade gibt es keine Termine mit Anmeldung. Alle Termine findet ihr im{" "}
          <Link href="/kalender" className="font-medium text-fsr underline underline-offset-4">
            Kalender
          </Link>
          .
        </Reveal>
      ) : (
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((e) => (
            <StaggerItem key={e.id} variant="scale">
              <SignupCard event={e} phase={e.start <= now ? "live" : "upcoming"} source="LIST" />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </>
  );
}

import { getEvents } from "@/app/_actions/event";
import { FullBleed } from "@/components/full-bleed";
import { SignupCard } from "@/components/events/signup-card";
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
      <FullBleed>
        <div className="relative overflow-hidden bg-fsr-deep text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(0,0,0,0.35),transparent_50%)]"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-20">
            <p className="text-sm font-bold uppercase tracking-widest text-white/70">Plätze begrenzt</p>
            <h1 className="mt-2 text-[clamp(3rem,10vw,6.5rem)] font-black uppercase leading-[0.9] tracking-tighter">
              Anmeldung
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Für diese Termine braucht ihr eine Anmeldung. Bei manchen werden die
              Plätze verlost – dort könnt ihr euch auch noch anmelden, wenn alle
              Plätze vergeben sind.
            </p>
          </div>
        </div>
      </FullBleed>

      {sorted.length === 0 ? (
        <div className="rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
          Gerade gibt es keine Termine mit Anmeldung. Alle Termine findet ihr im{" "}
          <Link href="/kalender" className="font-medium text-fsr underline underline-offset-4">
            Kalender
          </Link>
          .
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((e) => (
            <SignupCard
              key={e.id}
              event={e}
              phase={e.start <= now ? "live" : "upcoming"}
              source="LIST"
            />
          ))}
        </div>
      )}
    </>
  );
}

import { HeroLead, PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, Home, MessageCircle } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/kalender", icon: CalendarDays, title: "Kalender", text: "Alle Termine des FSR" },
  { href: "/kontakt", icon: MessageCircle, title: "Kontakt", text: "Etwas gesucht? Schreib uns." },
];

export default function NotFound() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <PageHero
        eyebrow="Fehler 404"
        title={
          <>
            Seite nicht{" "}
            <span className="text-transparent [-webkit-text-stroke:2px_white]">gefunden</span>
          </>
        }
        poster
      >
        <HeroLead>
          Diese Seite gibt es nicht (mehr). Vielleicht hat sich der Link geändert –
          von hier aus findest du weiter.
        </HeroLead>
        <Button asChild size="lg" className="mt-8 bg-white text-fsr-deep hover:bg-white/90">
          <Link href="/" data-umami-event="404-Button">
            <Home className="mr-2 size-4" /> Zur Startseite
          </Link>
        </Button>
      </PageHero>

      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex items-center gap-4 rounded-3xl border bg-card p-5 transition hover:border-fsr/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-fsr/10 text-fsr">
                <l.icon className="size-5" />
              </span>
              <span>
                <span className="block font-bold">{l.title}</span>
                <span className="block text-sm text-muted-foreground">{l.text}</span>
              </span>
              <ArrowRight className="ml-auto size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-fsr" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { SectionHeading } from "@/components/section-heading";
import { ErstiHero } from "@/components/ersti/ersti-hero";
import { PosterList, PosterItem } from "@/components/poster-list";
import { SponsorStrip } from "@/components/ersti/sponsor-strip";
import { SignupCard } from "@/components/events/signup-card";
import { Stagger, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { getWeekDays } from "@/lib/berlin";
import { ERSTI_DAYS, ERSTI_START, erstiSponsors } from "@/lib/ersti";
import { isFull } from "@/lib/events";
import { phaseOf, useNow } from "@/lib/use-now";
import { getWeekStatus } from "@/lib/week-status";
import {
  ArrowDown,
  Coffee,
  GraduationCap,
  Map as MapIcon,
  PartyPopper,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { FaqSection } from "./faq";
import { Lineup } from "./lineup";
import { NowCard } from "./now-card";

const expectations: PosterItem[] = [
  { icon: Trophy, title: "Sport", text: "Gemeinsam aktiv werden und Teams bilden." },
  { icon: MapIcon, title: "Touren", text: "Stadt und Campus kennenlernen." },
  { icon: GraduationCap, title: "Workshops", text: "Infos rund ums Studieren." },
  { icon: PartyPopper, title: "Partys", text: "Kneipenabende zum Feiern und Vernetzen." },
  { icon: Coffee, title: "Ankommen", text: "Chillige Treffpunkte zum Durchatmen." },
];

export default function ErstiView({
  events,
  renderDayKey,
}: {
  events: EventItem[];
  renderDayKey: string;
}) {
  const days = useMemo(() => getWeekDays(ERSTI_START, ERSTI_DAYS), []);
  const now = useNow();
  const ready = now !== null;

  // Sobald die Uhrzeit bekannt ist, ändern Jetzt-Karte und Highlights ihre Höhe –
  // ein Anker wie #lineup wird danach noch einmal angesprungen
  useEffect(() => {
    if (!ready || !window.location.hash) return;
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
  }, [ready]);
  const status = getWeekStatus(days, now);
  const todayKey = status?.kind === "during" ? status.todayKey : null;

  const highlights = events
    .filter((e) => e.isHighlight && phaseOf(e, now) !== "past")
    // Ausgebuchte nach hinten
    .sort((a, b) => Number(isFull(a)) - Number(isFull(b)) || a.start.getTime() - b.start.getTime());

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <ErstiHero events={events} programHref="#lineup" />

      {/* Jetzt / Als Nächstes */}
      <NowCard events={events} now={now} status={status} className="-mt-4 md:-mt-8" />

      {/* <Expectations /> */}

      {/* Highlights */}
      {highlights.length > 0 && (
        <section>
          <SectionHeading eyebrow="Nicht verpassen" title="Highlights der Woche" />
          <Stagger className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {highlights.map((e) => (
              <StaggerItem key={e.id} variant="scale">
                <SignupCard event={e} phase={phaseOf(e, now)} source="ERSTI" />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {/* Line-up */}
      <Lineup
        events={events}
        days={days}
        now={now}
        todayKey={todayKey}
        renderDayKey={renderDayKey}
      />

      {/* Häufige Fragen */}
      <FaqSection />

      {/* Sponsoren */}
      <section>
        <SectionHeading eyebrow="Danke" title="Unterstützt von" className="mb-8">
          Danke an alle Partner*innen, die die Ersti-Woche möglich machen.
        </SectionHeading>
        <SponsorStrip sponsors={erstiSponsors} />
      </section>
    </div>
  );
}

/** Programm-Arten als Poster-Liste mit großen Schlagworten. */
function Expectations() {
  return (
    <section className="grid gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
      <div className="md:pt-5">
        <SectionHeading eyebrow="Das Programm" title="Was euch erwartet">
          Kommt zu allem, was euch interessiert. Nur Termine mit dem Hinweis
          „Anmeldung nötig“ haben begrenzte Plätze – alles andere ist offen,
          einfach vorbeikommen.
        </SectionHeading>
        <Button asChild variant="outline" className="mt-6">
          <a href="#lineup">
            Zum Line-up <ArrowDown className="ml-2 size-4" />
          </a>
        </Button>
      </div>
      <PosterList items={expectations} />
    </section>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { ERSTI_DAYS, ERSTI_GUIDE, ERSTI_START, erstiSponsors } from "@/lib/ersti";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  Coffee,
  FileText,
  GraduationCap,
  Map as MapIcon,
  PartyPopper,
  Ticket,
  Trophy,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Marquee from "react-fast-marquee";
import { formatBerlin, getWeekDays, timeRange } from "../_designs/berlin";
import { EventDialog } from "../_designs/event-dialog";
import { isFull } from "../_designs/event-status";
import { SponsorStrip } from "../_designs/sponsor-strip";
import { phaseOf, useNow } from "../_designs/use-now";
import { getWeekStatus } from "../_designs/week-status";
import { FaqSection } from "./faq";
import { Lineup } from "./lineup";
import { NowCard } from "./now-card";

const FULL_BLEED = { width: "100vw", marginLeft: "calc(50% - 50vw)" };

const expectations = [
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
  const status = getWeekStatus(days, now);
  const todayKey = status?.kind === "during" ? status.todayKey : null;
  const reduceMotion = useReducedMotion();

  const highlights = events
    .filter((e) => e.registrable && phaseOf(e, now) !== "past")
    // Ausgebuchte nach hinten
    .sort((a, b) => Number(isFull(a)) - Number(isFull(b)) || a.start.getTime() - b.start.getTime());

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* Full-Bleed-Abschnitte ohne horizontalen Scrollbalken */}
      <style>{`body{overflow-x:clip}`}</style>

      {/* Hero (Entwurf 2) */}
      <section className="-mt-8" style={FULL_BLEED}>
        <div className="relative overflow-hidden bg-fsr-deep text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(0,0,0,0.35),transparent_50%)]"
          />
          <img
            src="/logo_outline.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] opacity-[0.07] invert"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[1.5fr_1fr] md:py-24">
            <div>
              <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/25 backdrop-blur">
                {formatBerlin(days[0].date, "dd.")}–{formatBerlin(days[ERSTI_DAYS - 1].date, "dd.MM.yyyy")} · Halle (Saale)
              </span>
              <h1 className="mt-6 text-[clamp(3.6rem,14vw,9rem)] font-black uppercase leading-[0.85] tracking-tighter">
                Ersti
                <br />
                <span className="text-transparent [-webkit-text-stroke:2px_white]">Woche</span>{" "}
                26
              </h1>
              <p className="mt-6 max-w-lg text-lg text-white/85">
                Fünf Tage Touren, Sport, Workshops, Kneipenabende und Partys –
                euer Start ins Studium, organisiert vom FSR WiWi.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-white text-fsr-deep hover:bg-white/90">
                  <a href="#lineup">Programm ansehen</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={ERSTI_GUIDE} target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 size-4" /> Ersti-Guide (PDF)
                  </a>
                </Button>
              </div>
            </div>
            <div className="hidden justify-center md:flex">
              <div className="-rotate-6 rounded-full bg-white p-3 shadow-[0_25px_50px_rgba(0,0,0,0.35)]">
                <Image
                  src="/logo.png"
                  alt="Logo des FSR WiWi"
                  width={340}
                  height={340}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        {events.length > 0 && (
          <div className="bg-foreground text-background">
            <Marquee speed={40} autoFill play={!reduceMotion} className="py-3">
              {events.map((e) => (
                <span key={e.id} className="mx-5 text-sm font-bold uppercase tracking-widest">
                  {e.title}
                  <span className="ml-10 text-fsr-foreground">✦</span>
                </span>
              ))}
            </Marquee>
          </div>
        )}
      </section>

      {/* Jetzt / Als Nächstes (Entwurf 3) */}
      <NowCard events={events} now={now} status={status} className="-mt-4 md:-mt-8" />

      <Expectations />

      {/* Highlights (Entwurf 2) */}
      {highlights.length > 0 && (
        <section>
          <p className="text-sm font-bold uppercase tracking-widest text-fsr">Plätze begrenzt</p>
          <h2 className="mt-1 text-4xl font-black tracking-tight md:text-5xl">Highlights mit Anmeldung</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {highlights.map((e) => (
              <HighlightCard key={e.id} event={e} now={now} />
            ))}
          </div>
        </section>
      )}

      {/* Line-up (Entwurf 1) */}
      <Lineup
        events={events}
        days={days}
        now={now}
        todayKey={todayKey}
        renderDayKey={renderDayKey}
      />

      {/* Häufige Fragen (Entwurf 3) */}
      <FaqSection />

      {/* Sponsoren (Entwurf 1) */}
      <section>
        <h2 className="mb-2 text-2xl font-bold tracking-tight">Unterstützt von</h2>
        <p className="mb-6 text-muted-foreground">
          Danke an alle Partner*innen, die die Ersti-Woche möglich machen.
        </p>
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
        <p className="text-sm font-bold uppercase tracking-widest text-fsr">Das Programm</p>
        <h2 className="mt-1 text-4xl font-black tracking-tight md:text-5xl">Was euch erwartet</h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          Kommt zu allem, was euch interessiert. Nur Termine mit dem Hinweis
          „Anmeldung nötig“ haben begrenzte Plätze – alles andere ist offen,
          einfach vorbeikommen.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <a href="#lineup">
            Zum Line-up <ArrowDown className="ml-2 size-4" />
          </a>
        </Button>
      </div>
      <ol className="border-b">
        {expectations.map(({ icon: Icon, title, text }, i) => (
          <li
            key={title}
            className="grid grid-cols-[2.5rem_1fr] items-center gap-x-4 border-t py-5 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-6"
          >
            <span
              aria-hidden
              className="text-2xl font-black tabular-nums text-transparent [-webkit-text-stroke:1.5px_hsl(var(--fsr1))] sm:text-4xl"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">{text}</p>
            </div>
            <span className="hidden size-14 items-center justify-center rounded-full bg-fsr/10 text-fsr sm:flex">
              <Icon className="size-6" />
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function HighlightCard({ event, now }: { event: EventItem; now: Date | null }) {
  const phase = phaseOf(event, now);
  const full = isFull(event);
  const hasSeats = event.maxGuests != null && event.restSeats != null;
  const taken = hasSeats ? Math.round(((event.maxGuests! - event.restSeats!) / event.maxGuests!) * 100) : 0;
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border bg-card">
      <div className="flex items-center gap-4 bg-fsr/10 p-5">
        <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-fsr-deep text-white">
          <span className="text-[11px] font-bold uppercase">{formatBerlin(event.start, "EEE")}</span>
          <span className="text-2xl font-black leading-none">{formatBerlin(event.start, "dd")}</span>
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-tight">{event.title}</h3>
          <p className="text-sm text-muted-foreground">{timeRange(event.start, event.end)} Uhr</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        {event.description && (
          <p className="line-clamp-3 text-sm text-muted-foreground">{event.description}</p>
        )}
        {hasSeats && (
          <div>
            <div className="mb-1.5 flex justify-between text-xs font-semibold">
              <span className={full ? "text-destructive" : undefined}>
                {full ? "Ausgebucht" : `${event.restSeats} von ${event.maxGuests} Plätzen frei`}
              </span>
              <span className="text-muted-foreground">{taken}% belegt</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full", full ? "bg-destructive" : "bg-fsr-deep")}
                style={{ width: `${taken}%` }}
              />
            </div>
          </div>
        )}
        <div className="mt-auto flex gap-2 pt-1">
          {full ? (
            <Button disabled className="flex-1">Ausgebucht</Button>
          ) : (
            <Button asChild className="flex-1 bg-fsr-deep text-white hover:bg-fsr-deep/90">
              <Link href={"/anmeldung/" + event.slug} data-umami-event={"Signup-ERSTI-" + event.slug}>
                <Ticket className="mr-2 size-4" /> Jetzt anmelden
              </Link>
            </Button>
          )}
          <EventDialog event={event} phase={phase}>
            <Button variant="outline">Details</Button>
          </EventDialog>
        </div>
      </div>
    </article>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { ERSTI_DAYS, ERSTI_GUIDE, ERSTI_START, erstiSponsors } from "@/lib/ersti";
import { cn, handleSafeAllEventsCalendar } from "@/lib/utils";
import {
  CalendarPlus,
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
import { useEffect, useMemo, useRef } from "react";
import Marquee from "react-fast-marquee";
import {
  eventsOnDay,
  formatBerlin,
  getWeekDays,
  timeRange,
  WeekDay,
} from "../_designs/berlin";
import { EventDialog } from "../_designs/event-dialog";
import { isFull } from "../_designs/event-status";
import { SponsorStrip } from "../_designs/sponsor-strip";
import { phaseOf, useNow } from "../_designs/use-now";
import { getWeekStatus } from "../_designs/week-status";

const FULL_BLEED = { width: "100vw", marginLeft: "calc(50% - 50vw)" };

const expectations = [
  { icon: Trophy, title: "Sport", text: "Gemeinsam aktiv werden und Teams bilden." },
  { icon: MapIcon, title: "Touren", text: "Stadt und Campus kennenlernen." },
  { icon: GraduationCap, title: "Workshops", text: "Infos rund ums Studieren." },
  { icon: PartyPopper, title: "Partys", text: "Kneipenabende zum Feiern und Vernetzen." },
  { icon: Coffee, title: "Ankommen", text: "Chillige Treffpunkte zum Durchatmen." },
];

export default function FestivalView({ events }: { events: EventItem[] }) {
  const days = useMemo(() => getWeekDays(ERSTI_START, ERSTI_DAYS), []);
  const now = useNow();
  const status = getWeekStatus(days, now);
  const todayKey = status?.kind === "during" ? status.todayKey : null;
  const reduceMotion = useReducedMotion();

  const highlights = events
    .filter((e) => e.registrable && phaseOf(e, now) !== "past")
    // Ausgebuchte nach hinten
    .sort((a, b) => Number(isFull(a)) - Number(isFull(b)) || a.start.getTime() - b.start.getTime());

  // Mobile: Line-up direkt beim heutigen Tag starten
  const lineupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = lineupRef.current;
    const card = el?.querySelector<HTMLElement>(`[data-day="${todayKey}"]`);
    if (el && card && el.scrollWidth > el.clientWidth) {
      el.scrollLeft = card.offsetLeft - 16;
    }
  }, [todayKey]);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* Full-Bleed-Abschnitte ohne horizontalen Scrollbalken */}
      <style>{`body{overflow-x:clip}`}</style>

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

      {/* Highlights */}
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

      {/* Line-up */}
      <section id="lineup" className="scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-fsr">Die ganze Woche</p>
            <h2 className="mt-1 text-4xl font-black tracking-tight md:text-5xl">Line-up</h2>
          </div>
          <Button
            variant="outline"
            onClick={() => handleSafeAllEventsCalendar(events)}
            data-umami-event="SaveCalendar-DESIGN2-all"
          >
            <CalendarPlus className="mr-2 size-4" /> Alles in den Kalender
          </Button>
        </div>
        <div
          ref={lineupRef}
          className="-mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0"
        >
          {days.map((day) => (
            <DayCard
              key={day.key}
              day={day}
              events={eventsOnDay(events, day.key)}
              isToday={day.key === todayKey}
              now={now}
            />
          ))}
        </div>
        <p className="mt-2 text-sm text-muted-foreground md:hidden">← Wischen für weitere Tage →</p>
      </section>

      {/* Was euch erwartet */}
      <section>
        <h2 className="text-4xl font-black tracking-tight md:text-5xl">Was euch erwartet</h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
          {expectations.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-3xl border bg-card p-5">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-fsr/10 text-fsr">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Sponsoren */}
      <section className="rounded-[2rem] bg-zinc-950 p-6 text-white sm:p-10">
        <p className="text-sm font-bold uppercase tracking-widest text-fsr-foreground">Präsentiert von</p>
        <h2 className="mt-1 text-3xl font-black tracking-tight">Unsere Partner*innen</h2>
        <SponsorStrip sponsors={erstiSponsors} className="mt-8" />
      </section>
    </div>
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
              <Link href={"/anmeldung/" + event.slug} data-umami-event={"Signup-DESIGN2-" + event.slug}>
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

function DayCard({
  day,
  events,
  isToday,
  now,
}: {
  day: WeekDay;
  events: EventItem[];
  isToday: boolean;
  now: Date | null;
}) {
  return (
    <div
      data-day={day.key}
      className={cn(
        "flex w-[82%] shrink-0 snap-start flex-col rounded-3xl border bg-card p-4 md:w-auto",
        isToday && "border-transparent ring-2 ring-fsr-deep"
      )}
    >
      <div className="mb-1 flex items-start justify-between border-b pb-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-fsr">
            {formatBerlin(day.date, "EEEE")}
          </div>
          <div className="text-3xl font-black tabular-nums">{formatBerlin(day.date, "dd.MM.")}</div>
        </div>
        {isToday && (
          <span className="rounded-full bg-fsr-deep px-2 py-0.5 text-[10px] font-bold uppercase text-white">
            Heute
          </span>
        )}
      </div>
      {events.length === 0 && <p className="py-3 text-sm text-muted-foreground">Nichts geplant</p>}
      <ul className="divide-y">
        {events.map((e) => {
          const phase = phaseOf(e, now);
          return (
            <li key={e.id} className={cn(phase === "past" && "opacity-45")}>
              <EventDialog event={e} phase={phase}>
                <button
                  type="button"
                  className="group flex w-full gap-3 rounded-lg py-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr"
                >
                  <span className="w-11 shrink-0 text-sm font-bold tabular-nums">
                    {formatBerlin(e.start, "HH:mm")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold leading-snug group-hover:text-fsr">
                      {e.title}
                    </span>
                    {phase === "live" && (
                      <span className="mt-0.5 flex items-center gap-1 text-[11px] font-bold uppercase text-fsr">
                        <span className="size-1.5 rounded-full bg-fsr-deep" /> Läuft gerade
                      </span>
                    )}
                    {e.registrable && phase !== "past" && (
                      <span
                        className={cn(
                          "mt-0.5 flex items-center gap-1 text-[11px] font-medium",
                          isFull(e) ? "text-destructive" : "text-muted-foreground"
                        )}
                      >
                        <Ticket className="size-3" />
                        {isFull(e) ? "Ausgebucht" : "Anmeldung nötig"}
                      </span>
                    )}
                  </span>
                </button>
              </EventDialog>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

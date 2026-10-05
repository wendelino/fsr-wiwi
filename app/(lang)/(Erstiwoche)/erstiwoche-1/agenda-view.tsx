"use client";

import { Button } from "@/components/ui/button";
import { ERSTI_DAYS, ERSTI_GUIDE, ERSTI_START, erstiSponsors } from "@/lib/ersti";
import { cn, handleSafeAllEventsCalendar } from "@/lib/utils";
import { ArrowDown, CalendarPlus, ChevronRight, FileText, Ticket } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  eventsOnDay,
  formatBerlin,
  getWeekDays,
  timeRange,
  weekRangeLabel,
} from "../_designs/berlin";
import { EventDialog } from "../_designs/event-dialog";
import { EventStatus } from "../_designs/event-status";
import { SponsorStrip } from "../_designs/sponsor-strip";
import { Phase, phaseOf, useNow } from "../_designs/use-now";
import { getWeekStatus, WeekStatus } from "../_designs/week-status";

export default function AgendaView({ events }: { events: EventItem[] }) {
  const days = useMemo(() => getWeekDays(ERSTI_START, ERSTI_DAYS), []);
  const now = useNow();
  const status = getWeekStatus(days, now);
  const todayKey = status?.kind === "during" ? status.todayKey : null;

  const [selected, setSelected] = useState(days[0].key);
  const [onlyRegistrable, setOnlyRegistrable] = useState(false);
  const [showPast, setShowPast] = useState(false);

  // Während der Woche direkt den heutigen Tag zeigen
  useEffect(() => {
    if (todayKey) setSelected(todayKey);
  }, [todayKey]);

  const registrableCount = events.filter((e) => e.registrable).length;
  const dayEvents = eventsOnDay(events, selected).filter(
    (e) => !onlyRegistrable || e.registrable
  );
  const firstNotPast = dayEvents.findIndex((e) => phaseOf(e, now) !== "past");
  const showNowLine = selected === todayKey && now !== null;
  // Heute: Vergangenes einklappen, damit "Jetzt" oben steht
  const pastCount = showNowLine ? (firstNotPast === -1 ? dayEvents.length : firstNotPast) : 0;
  const hidePast = pastCount > 0 && !showPast;

  return (
    <div className="flex flex-col gap-14 md:gap-20">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-fsr/10 via-background to-background p-6 sm:p-10 md:p-14">
        <img
          src="/logo_outline.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-10 hidden w-80 opacity-10 md:block"
        />
        <div className="relative max-w-2xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-fsr">
            FSR WiWi · MLU Halle
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Ersti-Woche 2026
          </h1>
          <p className="text-lg text-muted-foreground">
            <strong className="text-foreground">{weekRangeLabel(days)}</strong>{" "}
            – fünf Tage, um Uni, Stadt und neue Leute kennenzulernen.
            Organisiert vom Fachschaftsrat Wirtschaftswissenschaften.
          </p>
          <StatusLine status={status} events={events} now={now} />
          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="bg-fsr-deep text-white hover:bg-fsr-deep/90">
              <a href="#programm">
                Zum Programm <ArrowDown className="ml-2 size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={ERSTI_GUIDE} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 size-4" /> Ersti-Guide (PDF)
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/anmeldung">
                <Ticket className="mr-2 size-4" /> Anmeldung
              </Link>
            </Button>
          </div>
        </div>
        <dl className="relative mt-10 grid max-w-xl grid-cols-3 gap-3">
          <Stat value={events.length} label="Termine" />
          <Stat value={registrableCount} label="mit Anmeldung" />
          <Stat value={ERSTI_DAYS} label="Tage" />
        </dl>
      </section>

      {/* Programm */}
      <section id="programm" className="scroll-mt-24">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Programm</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSafeAllEventsCalendar(events)}
            data-umami-event="SaveCalendar-DESIGN1-all"
          >
            <CalendarPlus className="mr-2 size-4" /> Alle Termine in den Kalender
          </Button>
        </div>

        <div className="sticky top-[72px] z-20 -mx-4 border-b bg-background/90 px-4 py-3 backdrop-blur">
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {days.map((day) => {
              const isSelected = day.key === selected;
              const isToday = day.key === todayKey;
              const count = eventsOnDay(events, day.key).length;
              return (
                <button
                  key={day.key}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelected(day.key)}
                  className={cn(
                    "relative flex flex-col items-center rounded-xl border px-1 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr",
                    isSelected
                      ? "border-transparent bg-fsr-deep text-white shadow-md"
                      : "bg-card hover:bg-muted"
                  )}
                >
                  <span className="font-semibold">
                    <span className="sm:hidden">{formatBerlin(day.date, "EEEEEE")}</span>
                    <span className="hidden sm:inline">{formatBerlin(day.date, "EEEE")}</span>
                  </span>
                  <span className="text-xs opacity-80">{formatBerlin(day.date, "dd.MM.")}</span>
                  <span className="mt-1 text-[10px] font-medium opacity-70">
                    {isToday ? "Heute" : `${count} Termine`}
                  </span>
                  {isToday && !isSelected && (
                    <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-fsr-deep" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-sm">
            <span className="font-medium">
              {formatBerlin(days.find((d) => d.key === selected)!.date, "EEEE, dd. MMMM")}
            </span>
            <button
              type="button"
              aria-pressed={onlyRegistrable}
              onClick={() => setOnlyRegistrable((v) => !v)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition",
                onlyRegistrable ? "border-fsr bg-fsr/10 text-fsr" : "hover:bg-muted"
              )}
            >
              Nur mit Anmeldung
            </button>
          </div>
        </div>

        <ol className="mt-6 space-y-1">
          {dayEvents.length === 0 && (
            <li className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
              {onlyRegistrable
                ? "An diesem Tag gibt es nichts mit Anmeldung – alles andere ist offen, kommt einfach vorbei."
                : "An diesem Tag ist nichts geplant."}
            </li>
          )}
          {pastCount > 0 && (
            <li className="grid grid-cols-[3.5rem_1fr] gap-3 sm:grid-cols-[5rem_1fr] sm:gap-6">
              <span />
              <button
                type="button"
                onClick={() => setShowPast((v) => !v)}
                className="justify-self-start rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground transition hover:bg-muted"
              >
                {hidePast
                  ? `${pastCount} vergangene ${pastCount === 1 ? "Termin" : "Termine"} einblenden`
                  : "Vergangene ausblenden"}
              </button>
            </li>
          )}
          {dayEvents.map((event, i) => hidePast && i < pastCount ? null : (
            <TimelineEntry
              key={event.id}
              event={event}
              phase={phaseOf(event, now)}
              nowLabel={
                showNowLine && i === firstNotPast ? formatBerlin(now!, "HH:mm") : null
              }
            />
          ))}
          {showNowLine && firstNotPast === -1 && dayEvents.length > 0 && (
            <NowLine label={formatBerlin(now!, "HH:mm")} />
          )}
        </ol>
      </section>

      {/* Sponsoren */}
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

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl border bg-background/70 p-3 sm:p-4">
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block text-2xl font-bold tabular-nums sm:text-3xl">{value}</span>
        <span className="text-xs text-muted-foreground sm:text-sm">{label}</span>
      </dd>
    </div>
  );
}

function StatusLine({
  status,
  events,
  now,
}: {
  status: WeekStatus | null;
  events: EventItem[];
  now: Date | null;
}) {
  // Feste Höhe, damit nach dem Mount nichts springt
  const base = "inline-flex min-h-9 items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium";
  if (!status) return <div className={cn(base, "invisible")}>…</div>;
  if (status.kind === "before")
    return (
      <div className={base}>
        <span className="size-2 rounded-full bg-fsr-deep" />
        {status.daysUntil === 1 ? "Morgen geht's los!" : `Noch ${status.daysUntil} Tage bis zum Start`}
      </div>
    );
  if (status.kind === "after")
    return <div className={base}>Die Ersti-Woche ist vorbei – schön, dass ihr dabei wart!</div>;
  const live = events.find((e) => phaseOf(e, now) === "live");
  return (
    <div className={base}>
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fsr-deep opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-fsr-deep" />
      </span>
      Tag {status.dayIndex + 1} von {ERSTI_DAYS}
      {live && <span className="text-muted-foreground">· Gerade: {live.title}</span>}
    </div>
  );
}

function NowLine({ label }: { label: string }) {
  return (
    <li aria-hidden className="grid grid-cols-[3.5rem_1fr] items-center gap-3 py-1 sm:grid-cols-[5rem_1fr] sm:gap-6">
      <span className="text-right text-xs font-bold tabular-nums text-fsr">{label}</span>
      <span className="-ml-[5px] flex items-center gap-2">
        <span className="size-3 rounded-full bg-fsr-deep ring-4 ring-fsr/20" />
        <span className="h-0.5 flex-1 bg-fsr-deep/70" />
        <span className="text-xs font-semibold uppercase tracking-wide text-fsr">Jetzt</span>
      </span>
    </li>
  );
}

function TimelineEntry({
  event,
  phase,
  nowLabel,
}: {
  event: EventItem;
  phase: Phase;
  nowLabel: string | null;
}) {
  const [from, to] = timeRange(event.start, event.end).split("–");
  return (
    <>
      {nowLabel && <NowLine label={nowLabel} />}
      <li
        className={cn(
          "grid grid-cols-[3.5rem_1fr] gap-3 sm:grid-cols-[5rem_1fr] sm:gap-6",
          phase === "past" && "opacity-55"
        )}
      >
        <div className="pt-4 text-right tabular-nums">
          <div className="font-semibold">{from}</div>
          <div className="text-xs text-muted-foreground">bis {to}</div>
        </div>
        <div className="relative border-l-2 pb-3 pl-5">
          <span
            className={cn(
              "absolute -left-[7px] top-5 size-3 rounded-full border-2 bg-background",
              phase === "live" ? "border-fsr-deep bg-fsr-deep" : "border-muted-foreground/40"
            )}
          />
          <EventDialog event={event} phase={phase}>
            <button
              type="button"
              className={cn(
                "group w-full rounded-2xl border bg-card p-4 text-left transition hover:border-fsr/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr",
                phase === "live" && "border-fsr/50 shadow-md"
              )}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="font-semibold leading-snug">{event.title}</span>
                <ChevronRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5" />
              </span>
              {event.description && (
                <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">
                  {event.description}
                </span>
              )}
              <EventStatus event={event} phase={phase} className="mt-3" />
            </button>
          </EventDialog>
        </div>
      </li>
    </>
  );
}

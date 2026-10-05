"use client";

import { Button } from "@/components/ui/button";
import { cn, handleSafeAllEventsCalendar } from "@/lib/utils";
import { CalendarPlus, ChevronRight } from "lucide-react";
import { EventDialog } from "@/components/events/event-dialog";
import { EventStatus } from "@/components/events/event-status";
import { eventsOnDay, formatBerlin, timeRange, WeekDay } from "@/lib/berlin";
import { plainText } from "@/lib/events";
import { Phase, phaseOf } from "@/lib/use-now";
import { useRef, useState } from "react";

// Höhe der fixen Navbar, darunter klebt die Tagesleiste
const NAV_HEIGHT = 72;

/** Tagesleiste + Timeline aus Entwurf 1; der heutige Tag ist immer vorausgewählt. */
export function Lineup({
  events,
  days,
  now,
  todayKey,
  renderDayKey,
}: {
  events: EventItem[];
  days: WeekDay[];
  now: Date | null;
  todayKey: string | null;
  renderDayKey: string;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const [onlyRegistrable, setOnlyRegistrable] = useState(false);
  const [showPast, setShowPast] = useState(false);
  const barAnchorRef = useRef<HTMLDivElement>(null);

  // Ist man schon in die Liste gescrollt, springt man beim Wechsel an ihren Anfang –
  // sonst landet man bei einem kürzeren Tag im Footer.
  function scrollToListStart() {
    const top = barAnchorRef.current?.getBoundingClientRect().top;
    if (top != null && top < NAV_HEIGHT) {
      window.scrollTo({ top: window.scrollY + top - NAV_HEIGHT, behavior: "instant" });
    }
  }

  // Bis die Uhrzeit im Browser bekannt ist, gilt der Tag vom Server
  const firstDay = days[0].key;
  const serverToday = days.some((d) => d.key === renderDayKey) ? renderDayKey : firstDay;
  const defaultDay = now ? (todayKey ?? firstDay) : serverToday;
  const selected = picked ?? defaultDay;

  const dayEvents = eventsOnDay(events, selected).filter(
    (e) => !onlyRegistrable || e.registrable
  );
  const firstNotPast = dayEvents.findIndex((e) => phaseOf(e, now) !== "past");
  const showNowLine = selected === todayKey && now !== null;
  // Heute: Vergangenes einklappen, damit "Jetzt" oben steht
  const pastCount = showNowLine ? (firstNotPast === -1 ? dayEvents.length : firstNotPast) : 0;
  const hidePast = pastCount > 0 && !showPast;

  return (
    <section id="lineup" className="scroll-mt-24">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-fsr">Die ganze Woche</p>
          <h2 className="mt-1 text-4xl font-black tracking-tight md:text-5xl">Line-up</h2>
        </div>
        <Button
          variant="outline"
          onClick={() => handleSafeAllEventsCalendar(events)}
          data-umami-event="SaveCalendar-ERSTI-all"
        >
          <CalendarPlus className="mr-2 size-4" /> Alle Termine in den Kalender
        </Button>
      </div>

      <div ref={barAnchorRef} aria-hidden />
      <div className="sticky top-[72px] z-20 -mx-4 border-b bg-background/90 px-4 py-3 backdrop-blur">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {days.map((day) => {
            const isSelected = day.key === selected;
            return (
              <button
                key={day.key}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setPicked(day.key);
                  scrollToListStart();
                }}
                className={cn(
                  "flex flex-col items-center rounded-xl border px-1 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr",
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
            onClick={() => {
              setOnlyRegistrable((v) => !v);
              scrollToListStart();
            }}
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
              onClick={() => {
                setShowPast((v) => !v);
                scrollToListStart();
              }}
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
                  {plainText(event.description)}
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

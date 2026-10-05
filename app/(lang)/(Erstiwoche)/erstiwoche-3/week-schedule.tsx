"use client";

import { cn } from "@/lib/utils";
import { Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import {
  berlinMinutesOfDay,
  eventsOnDay,
  formatBerlin,
  timeRange,
  WeekDay,
} from "../_designs/berlin";
import { EventDialog } from "../_designs/event-dialog";
import { EventStatus, isFull } from "../_designs/event-status";
import { Phase, phaseOf } from "../_designs/use-now";

const HOUR_PX = 60;

const startMin = (e: EventItem) => berlinMinutesOfDay(e.start);
// Dauer statt Uhrzeit, damit Events bis Mitternacht korrekt enden
const endMin = (e: EventItem) =>
  startMin(e) + Math.max(30, (e.end.getTime() - e.start.getTime()) / 60_000);

type Placed = { event: EventItem; col: number; cols: number };

/** Überlappende Events nebeneinander statt übereinander legen. */
function layoutDay(events: EventItem[]): Placed[] {
  const sorted = [...events].sort(
    (a, b) => startMin(a) - startMin(b) || endMin(b) - endMin(a)
  );
  const placed: Placed[] = [];
  let cluster: Placed[] = [];
  let columnEnds: number[] = [];
  let clusterEnd = -1;

  const flush = () => {
    cluster.forEach((p) => (p.cols = columnEnds.length));
    cluster = [];
    columnEnds = [];
  };

  for (const event of sorted) {
    if (startMin(event) >= clusterEnd) flush();
    let col = columnEnds.findIndex((end) => end <= startMin(event));
    if (col === -1) col = columnEnds.push(0) - 1;
    columnEnds[col] = endMin(event);
    clusterEnd = Math.max(clusterEnd, endMin(event));
    const p = { event, col, cols: 1 };
    cluster.push(p);
    placed.push(p);
  }
  flush();
  return placed;
}

export function WeekSchedule({
  events,
  days,
  now,
  todayKey,
}: {
  events: EventItem[];
  days: WeekDay[];
  now: Date | null;
  todayKey: string | null;
}) {
  // Zeitachse an die tatsächlichen Events anpassen
  const firstHour = events.length
    ? Math.floor(Math.min(...events.map(startMin)) / 60)
    : 10;
  const lastHour = events.length
    ? Math.min(24, Math.ceil(Math.max(...events.map(endMin)) / 60))
    : 22;
  const hours = Array.from({ length: lastHour - firstHour }, (_, i) => firstHour + i);
  const height = hours.length * HOUR_PX;
  const nowTop =
    now && todayKey ? ((berlinMinutesOfDay(now) - firstHour * 60) / 60) * HOUR_PX : null;

  const [mobileDay, setMobileDay] = useState(days[0].key);
  useEffect(() => {
    if (todayKey) setMobileDay(todayKey);
  }, [todayKey]);

  return (
    <>
      {/* Desktop: Wochenraster */}
      <div className="hidden md:block">
        <div className="grid grid-cols-[3rem_repeat(5,minmax(0,1fr))] gap-x-1.5 pb-2">
          <span />
          {days.map((day) => {
            const isToday = day.key === todayKey;
            return (
              <div
                key={day.key}
                className={cn(
                  "rounded-xl px-3 py-2",
                  isToday ? "bg-fsr-deep text-white" : "bg-muted/60"
                )}
              >
                <div className="text-sm font-semibold">
                  {formatBerlin(day.date, "EEEE")}
                  {isToday && <span className="ml-1.5 text-[10px] font-bold uppercase opacity-80">Heute</span>}
                </div>
                <div className={cn("text-xs", isToday ? "opacity-80" : "text-muted-foreground")}>
                  {formatBerlin(day.date, "dd.MM.")} · {eventsOnDay(events, day.key).length} Termine
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="relative grid grid-cols-[3rem_repeat(5,minmax(0,1fr))] gap-x-1.5"
          style={{ height }}
        >
          <div className="relative">
            {hours.map((h) => (
              <span
                key={h}
                className="absolute right-2 -translate-y-1/2 text-[11px] tabular-nums text-muted-foreground"
                style={{ top: (h - firstHour) * HOUR_PX }}
              >
                {String(h).padStart(2, "0")}:00
              </span>
            ))}
          </div>
          {days.map((day) => {
            const isToday = day.key === todayKey;
            return (
              <div
                key={day.key}
                className={cn("relative rounded-xl", isToday && "bg-fsr/[0.05]")}
                style={{
                  backgroundImage: `repeating-linear-gradient(to bottom, hsl(var(--border)) 0 1px, transparent 1px ${HOUR_PX}px)`,
                }}
              >
                {layoutDay(eventsOnDay(events, day.key)).map(({ event, col, cols }) => {
                  const top = ((startMin(event) - firstHour * 60) / 60) * HOUR_PX;
                  const h = ((Math.min(endMin(event), lastHour * 60) - startMin(event)) / 60) * HOUR_PX;
                  return (
                    <div
                      key={event.id}
                      className="absolute p-0.5"
                      style={{
                        top,
                        height: h,
                        left: `${(col / cols) * 100}%`,
                        width: `${100 / cols}%`,
                      }}
                    >
                      <ScheduleBlock event={event} phase={phaseOf(event, now)} compact={h < 45} />
                    </div>
                  );
                })}
                {isToday && nowTop !== null && nowTop >= 0 && nowTop <= height && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 z-10 flex items-center"
                    style={{ top: nowTop }}
                  >
                    <span className="-ml-1 size-2.5 rounded-full bg-fsr-deep" />
                    <span className="h-0.5 flex-1 bg-fsr-deep" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <Legend />
      </div>

      {/* Mobile: Tagesauswahl + Liste */}
      <div className="md:hidden">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3">
          {days.map((day) => (
            <button
              key={day.key}
              type="button"
              aria-pressed={day.key === mobileDay}
              onClick={() => setMobileDay(day.key)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium",
                day.key === mobileDay ? "border-transparent bg-fsr-deep text-white" : "bg-card"
              )}
            >
              {formatBerlin(day.date, "EEE dd.")}
              {day.key === todayKey && " · Heute"}
            </button>
          ))}
        </div>
        <ul className="space-y-2">
          {eventsOnDay(events, mobileDay).map((event) => {
            const phase = phaseOf(event, now);
            return (
              <li key={event.id} className={cn(phase === "past" && "opacity-50")}>
                <EventDialog event={event} phase={phase}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full gap-4 rounded-2xl border border-l-4 bg-card p-4 text-left",
                      blockTone(event)
                    )}
                  >
                    <span className="w-12 shrink-0 text-sm font-bold tabular-nums">
                      {formatBerlin(event.start, "HH:mm")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold leading-snug">{event.title}</span>
                      <span className="block text-xs text-muted-foreground">{timeRange(event.start, event.end)} Uhr</span>
                      <EventStatus event={event} phase={phase} className="mt-2" />
                    </span>
                  </button>
                </EventDialog>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

function blockTone(event: EventItem) {
  if (isFull(event)) return "border-l-destructive/70";
  if (event.registrable) return "border-l-fsr-deep";
  return "border-l-muted-foreground/30";
}

function ScheduleBlock({
  event,
  phase,
  compact,
}: {
  event: EventItem;
  phase: Phase;
  compact: boolean;
}) {
  return (
    <EventDialog event={event} phase={phase}>
      <button
        type="button"
        title={`${event.title} · ${timeRange(event.start, event.end)}`}
        className={cn(
          "flex h-full w-full flex-col overflow-hidden rounded-lg border-l-4 px-2 py-1 text-left text-xs transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr",
          event.registrable ? "bg-fsr/10" : "bg-muted",
          isFull(event) && "bg-[repeating-linear-gradient(135deg,hsl(var(--muted))_0_6px,transparent_6px_12px)]",
          blockTone(event),
          phase === "live" && "ring-2 ring-fsr-deep",
          phase === "past" && "opacity-50"
        )}
      >
        <span className={cn("font-semibold leading-tight", compact ? "line-clamp-1" : "line-clamp-2")}>
          {event.title}
        </span>
        {!compact && (
          <span className="mt-0.5 flex items-center gap-1 tabular-nums text-muted-foreground">
            {timeRange(event.start, event.end)}
            {event.registrable && <Ticket className="size-3 shrink-0" />}
          </span>
        )}
      </button>
    </EventDialog>
  );
}

function Legend() {
  return (
    <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <span className="size-3 rounded-sm border-l-4 border-l-fsr-deep bg-fsr/10" /> Anmeldung nötig
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-3 rounded-sm border-l-4 border-l-muted-foreground/30 bg-muted" /> Offen, einfach vorbeikommen
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-3 rounded-sm border-l-4 border-l-destructive/70 bg-muted" /> Ausgebucht
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-0.5 w-4 bg-fsr-deep" /> Jetzt
      </span>
    </div>
  );
}

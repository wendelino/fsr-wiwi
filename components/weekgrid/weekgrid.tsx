"use client";

import { useMemo, useState } from "react";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { de } from "date-fns/locale";
import { X } from "lucide-react";
import GridItem from "./grid-item";
import { Button } from "../ui/button";

interface WeekGridProps {
  events: EventItem[];
  startDate: Date; // Montag der Woche
}

const BERLIN_TZ = "Europe/Berlin";

// Anzeige-Konstanten (Berliner Ortszeit)
const START_HOUR = 10;
const END_HOUR = 24; // exklusiv für die Höhe (8-20 = 12h)
const SLOT_MINUTES = 30;
const ROW_HEIGHT_PX = 32; // visuelle Höhe pro 30 Minuten

const formatBerlin = (date: Date, formatStr: string) =>
  formatInTimeZone(date, BERLIN_TZ, formatStr, { locale: de });

const berlinDateKey = (date: Date) => formatBerlin(date, "yyyy-MM-dd");

const berlinMinutesOfDay = (date: Date) => {
  const zoned = toZonedTime(date, BERLIN_TZ);
  return zoned.getHours() * 60 + zoned.getMinutes();
};

type EventGroup = {
  id: string;
  start: Date;
  end: Date;
  events: EventItem[];
};

export default function WeekGrid({ events, startDate }: WeekGridProps) {
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);

  // Wochentage (Mo-Fr) in Berliner Kalendertagen
  const weekDays = useMemo(() => {
    const [year, month, day] = berlinDateKey(startDate).split("-").map(Number);
    return Array.from({ length: 5 }, (_, i) =>
      // 12:00 UTC bleibt am selben Kalendertag in Berlin (UTC+1/+2)
      new Date(Date.UTC(year, month - 1, day + i, 12, 0, 0))
    );
  }, [startDate]);

  const totalSlots = useMemo(
    () => (END_HOUR - START_HOUR) * (60 / SLOT_MINUTES),
    []
  );
  const containerHeight = totalSlots * ROW_HEIGHT_PX;

  const groupEventsForDay = (day: Date): EventGroup[] => {
    const dayKey = berlinDateKey(day);
    const dayEvents = events.filter(
      (e) => berlinDateKey(new Date(e.start)) === dayKey
    );

    const map = new Map<string, EventGroup>();
    for (const e of dayEvents) {
      const start = new Date(e.start);
      const end = new Date((e as any).end ?? start.getTime() + 60 * 60 * 1000);
      // Key nur über identische Start- und Endzeit (auf die Minute genau)
      const key = `${dayKey}__${start.toISOString()}__${end.toISOString()}`;
      const existing = map.get(key);
      if (existing) {
        existing.events.push(e);
      } else {
        map.set(key, { id: key, start, end, events: [e] });
      }
    }
    // Sortiert nach Startzeit
    return Array.from(map.values()).sort(
      (a, b) => a.start.getTime() - b.start.getTime()
    );
  };

  const computeBlockStyle = (start: Date, end: Date) => {
    const dayStartMin = START_HOUR * 60;
    const dayEndMin = END_HOUR * 60;
    const startMin = berlinMinutesOfDay(start);
    // Endzeiten um/nach Mitternacht liegen am Folgetag (00:00); Dauer statt Uhrzeit nutzen.
    const durationMin = Math.max(0, (end.getTime() - start.getTime()) / 60_000);
    const endMin = startMin + durationMin;

    const clampedStartMin = Math.max(startMin, dayStartMin);
    const clampedEndMin = Math.min(endMin, dayEndMin);

    const minutesFromDayStart = Math.max(0, clampedStartMin - dayStartMin);
    const durationMinutes = Math.max(
      SLOT_MINUTES,
      clampedEndMin - clampedStartMin
    );

    const top = (minutesFromDayStart / SLOT_MINUTES) * ROW_HEIGHT_PX;
    const height = (durationMinutes / SLOT_MINUTES) * ROW_HEIGHT_PX;
    return { top, height };
  };

  // Zeiten für die Skala (30-Minuten-Schritte, Berliner Ortszeit)
  const scaleTimes = useMemo(() => {
    const arr: { hours: number; minutes: number }[] = [];
    for (let h = START_HOUR; h < END_HOUR; h++) {
      arr.push({ hours: h, minutes: 0 }, { hours: h, minutes: 30 });
    }
    return arr;
  }, []);

  return (
    <div className="w-full">
      {/* Mobile Liste */}
      <div className="sm:hidden space-y-6">
        {weekDays.map((day) => {
          const groups = groupEventsForDay(day);
          return (
            <div key={day.toISOString()} className="">
              <div className="flex items-baseline justify-between">
                <div className="font-semibold">
                  {formatBerlin(day, "EEEE")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatBerlin(day, "dd.MM.yyyy")}
                </div>
              </div>
              <div className="mt-2 space-y-2">
                {groups.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    Keine Veranstaltungen
                  </div>
                )}
                {groups.map((g) => {
                  const isGroup = g.events.length > 1;
                  const event = g.events[0];
                  return (
                    <div
                      key={g.id} 
                      className="relative"
                      onClick={() =>
                        isGroup &&
                        setOpenGroupId((v) => (v === g.id ? null : g.id))
                      }
                    >
                      <GridItem
                        event={event}
                        length={isGroup ? g.events.length : undefined}
                      />

                      {/* Gruppen-Overlay */}
                      {isGroup && openGroupId === g.id ? (
                        <>
                          <div
                            className="absolute z-10 mt-1 w-full rounded-md border border-muted-foreground/40 bg-muted text-popover-foreground shadow-xl -top-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              type="button"
                              className="size-6 p-1 absolute -right-2 -top-2"
                              onClick={() => setOpenGroupId(null)}
                            >
                              <X className="size-5 inline-block " />
                            </Button>
                            <ul className="max-h-[66vh] overflow-auto p-1 space-y-1 pt-6">
                              {g.events.map((e) => (
                                <li key={e.id}>
                                  <GridItem event={e} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop/Tablet Raster */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="min-w-[900px] w-full">
          {/* Kopfzeile Wochentage */}
          <div className="grid grid-cols-[48px_repeat(5,1fr)]">
            <div className="h-16" />
            {weekDays.map((day) => (
              <div
                key={day.toISOString()}
                className="h-16 border-b p-2 text-center"
              >
                <div className="font-semibold">
                  {formatBerlin(day, "EEEE")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatBerlin(day, "dd.MM.yyyy")}
                </div>
              </div>
            ))}
          </div>

          {/* Körper: Zeitspalte + Tages-Spalten */}
          <div className="grid grid-cols-[48px_repeat(5,1fr)]">
            {/* Zeitspalte */}
            <div className="border-r" style={{ height: containerHeight }}>
              {scaleTimes.map((t, idx) => (
                <div
                  key={idx}
                  className={`flex items-start pr-1 text-[11px] tabular-nums ${
                    t.minutes === 0
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                  style={{
                    height: ROW_HEIGHT_PX,
                    borderBottom: "1px solid hsl(var(--border))",
                  }}
                >
                  {`${String(t.hours).padStart(2, "0")}:${String(t.minutes).padStart(2, "0")}`}
                </div>
              ))}
            </div>

            {/* 5 Tages-Spalten */}
            {weekDays.map((day) => {
              const groups = groupEventsForDay(day);
              return (
                <div
                  key={day.toISOString()}
                  className="relative border-r"
                  style={{ height: containerHeight }}
                >
                  {/* Hintergrund-Raster (30-Minuten-Linien) */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: totalSlots }).map((_, i) => (
                      <div
                        key={i}
                        className="border-b "
                        style={{
                          height: ROW_HEIGHT_PX,
                          borderColor: "hsl(var(--border))",
                        }}
                      />
                    ))}
                  </div>

                  {/* Event-Blöcke */}
                  <div className="absolute inset-0">
                    {groups.map((g) => {
                      const { top, height } = computeBlockStyle(g.start, g.end);
                      const isGroup = g.events.length > 1;
                      const event = g.events[0];
                      return (
                        <div
                          key={g.id}
                          className="absolute right-0.5 left-0.5"
                          style={{ top: top, height: height - 1 }}
                          onClick={() =>
                            isGroup &&
                            setOpenGroupId((v) => (v === g.id ? null : g.id))
                          }
                        >
                          <GridItem
                            event={event}
                            length={isGroup ? g.events.length : undefined}
                          />

                          {/* Gruppen-Overlay */}
                          {isGroup && openGroupId === g.id ? (
                            <>
                              <div
                                className="absolute z-10 mt-1 w-full rounded-md border border-muted-foreground/40 bg-muted text-popover-foreground shadow-xl -top-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Button
                                  type="button"
                                  className="size-6 p-1 absolute -right-2 -top-2"
                                  onClick={() => setOpenGroupId(null)}
                                >
                                  <X className="size-5 inline-block " />
                                </Button>
                                <ul className="max-h-[66vh] overflow-auto p-1 space-y-1 pt-6">
                                  {g.events.map((e) => (
                                    <li key={e.id}>
                                      <GridItem event={e} />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

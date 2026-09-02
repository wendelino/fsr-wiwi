"use client";

import { useMemo, useState } from "react";
import { differenceInMinutes, format, isSameDay } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { ChevronRight, X } from "lucide-react";
import { Badge } from "../ui/badge";
import GridItem from "./grid-item";
import { Button } from "../ui/button";

interface WeekGridProps {
  events: EventItem[];
  startDate: Date; // Montag der Woche
}

// Anzeige-Konstanten
const START_HOUR = 10;
const END_HOUR = 24; // exklusiv für die Höhe (8-20 = 12h)
const SLOT_MINUTES = 30;
const ROW_HEIGHT_PX = 32; // visuelle Höhe pro 30 Minuten

type EventGroup = {
  id: string;
  start: Date;
  end: Date;
  events: EventItem[];
};

export default function WeekGrid({ events, startDate }: WeekGridProps) {
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);

  // Wochentage (Mo-Fr)
  const weekDays = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const date = new Date(startDate);
      date.setHours(0, 0, 0, 0);
      date.setDate(startDate.getDate() + i);
      return date;
    });
  }, [startDate]);

  const totalSlots = useMemo(
    () => (END_HOUR - START_HOUR) * (60 / SLOT_MINUTES),
    []
  );
  const containerHeight = totalSlots * ROW_HEIGHT_PX;

  // Hilfsfunktionen
  const getDayStart = (day: Date) => {
    const d = new Date(day);
    d.setHours(START_HOUR, 0, 0, 0);
    return d;
  };
  const getDayEnd = (day: Date) => {
    const d = new Date(day);
    d.setHours(END_HOUR, 0, 0, 0);
    return d;
  };

  const groupEventsForDay = (day: Date): EventGroup[] => {
    const dayEvents = events.filter((e) => isSameDay(new Date(e.start), day));

    const map = new Map<string, EventGroup>();
    for (const e of dayEvents) {
      const start = new Date(e.start);
      const end = new Date((e as any).end ?? start.getTime() + 60 * 60 * 1000);
      // Key nur über identische Start- und Endzeit (auf die Minute genau)
      const key = `${day.toDateString()}__${start.toISOString()}__${end.toISOString()}`;
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

  const computeBlockStyle = (day: Date, start: Date, end: Date) => {
    const dayStart = getDayStart(day);
    const dayEnd = getDayEnd(day);
    const clampedStartMs = Math.max(start.getTime(), dayStart.getTime());
    const clampedEndMs = Math.min(end.getTime(), dayEnd.getTime());

    const minutesFromDayStart = Math.max(
      0,
      differenceInMinutes(clampedStartMs, dayStart)
    );
    const durationMinutes = Math.max(
      SLOT_MINUTES,
      differenceInMinutes(clampedEndMs, clampedStartMs)
    );

    const top = (minutesFromDayStart / SLOT_MINUTES) * ROW_HEIGHT_PX;
    const height = (durationMinutes / SLOT_MINUTES) * ROW_HEIGHT_PX;
    return { top, height };
  };

  // Zeiten für die Skala (30-Minuten-Schritte)
  const scaleTimes = useMemo(() => {
    const arr: Date[] = [];
    for (let h = START_HOUR; h < END_HOUR; h++) {
      const t1 = new Date(startDate);
      t1.setHours(h, 0, 0, 0);
      const t2 = new Date(startDate);
      t2.setHours(h, 30, 0, 0);
      arr.push(t1, t2);
    }
    return arr;
  }, [startDate]);

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
                  {format(day, "EEEE", { locale: de })}
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(day, "dd.MM.yyyy")}
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
          <div className="grid grid-cols-[48px_repeat(6,1fr)]">
            <div className="h-16" />
            {weekDays.map((day) => (
              <div
                key={day.toISOString()}
                className="h-16 border-b p-2 text-center"
              >
                <div className="font-semibold">
                  {format(day, "EEEE", { locale: de })}
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(day, "dd.MM.yyyy")}
                </div>
              </div>
            ))}
          </div>

          {/* Körper: Zeitspalte + Tages-Spalten */}
          <div className="grid grid-cols-[48px_repeat(6,1fr)]">
            {/* Zeitspalte */}
            <div className="border-r" style={{ height: containerHeight }}>
              {scaleTimes.map((t, idx) => (
                <div
                  key={idx}
                  className={`flex items-start pr-1 text-[11px] tabular-nums ${
                    format(t, "mm") === "00"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                  style={{
                    height: ROW_HEIGHT_PX,
                    borderBottom: "1px solid hsl(var(--border))",
                  }}
                >
                  {format(t, "HH:mm")}
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
                      const { top, height } = computeBlockStyle(
                        day,
                        g.start,
                        g.end
                      );
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

"use client";

import { loadEventsPage } from "@/app/_actions/events-page";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { berlinDateKey, formatBerlin } from "@/lib/berlin";
import { phaseOf, useNow } from "@/lib/use-now";
import { RotateCcw } from "lucide-react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import EventPreview from "./event-preview";

/** Termine nach Tagen gruppiert; lädt beim Scrollen die nächste Seite nach. */
export default function InfiniteScroll({
  initialEvents,
  initialCursor,
}: {
  initialEvents: EventItem[];
  initialCursor: string | null;
}) {
  const [events, setEvents] = useState(initialEvents);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialCursor !== null);
  const [failed, setFailed] = useState(false);
  const now = useNow();

  const sentinel = useRef<HTMLDivElement>(null);
  const inView = useInView(sentinel, { margin: "0px 0px 400px 0px" });

  useEffect(() => {
    if (!inView || !hasMore || loading || failed) return;
    setLoading(true);
    loadEventsPage(page)
      .then((res) => {
        if (res.failed) return setFailed(true);
        setEvents((prev) => [...prev, ...res.events]);
        setHasMore(res.nextCursor !== null);
        setPage((p) => p + 1);
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, [inView, hasMore, loading, failed, page]);

  return (
    <div className="flex flex-col gap-12">
      {groupByDay(events).map((day) => (
        <Reveal
          as="section"
          variant="fade"
          key={day.key}
          aria-label={formatBerlin(day.date, "EEEE, dd.MM.yyyy")}
          className="grid gap-4 sm:grid-cols-[5rem_1fr] sm:gap-6"
        >
          <DayTile date={day.date} />
          <Stagger as="ul" className="grid gap-3" step={0.05}>
            {day.events.map((event) => (
              <StaggerItem as="li" key={event.id}>
                <EventPreview event={event} phase={phaseOf(event, now)} />
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      ))}

      {failed ? (
        <div role="alert" className="flex flex-col items-center gap-3 rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
          Weitere Termine konnten gerade nicht geladen werden.
          <Button variant="outline" onClick={() => setFailed(false)}>
            <RotateCcw className="mr-2 size-4" /> Erneut versuchen
          </Button>
        </div>
      ) : hasMore ? (
        <div ref={sentinel} aria-busy className="grid gap-4 sm:grid-cols-[5rem_1fr] sm:gap-6">
          <Skeleton className="size-16 rounded-2xl" />
          <div className="grid gap-3">
            <Skeleton className="h-28 rounded-3xl" />
            <Skeleton className="h-28 rounded-3xl" />
          </div>
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          Das waren alle {events.length} Termine.
        </p>
      )}
    </div>
  );
}

/** Datums-Kachel; klebt ab sm neben den Terminen des Tages. */
function DayTile({ date }: { date: Date }) {
  return (
    <div className="flex items-center gap-3 sm:sticky sm:top-24 sm:flex-col sm:items-start sm:self-start">
      <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-fsr-deep text-white">
        <span className="text-[11px] font-bold uppercase">{formatBerlin(date, "EEE")}</span>
        <span className="text-2xl font-black leading-none tabular-nums">{formatBerlin(date, "dd")}</span>
      </div>
      <span className="text-sm font-semibold text-muted-foreground">{formatBerlin(date, "MMMM yyyy")}</span>
    </div>
  );
}

type Day = { key: string; date: Date; events: EventItem[] };

/** Neueste Tage zuerst, innerhalb eines Tages nach Beginn. */
function groupByDay(events: EventItem[]): Day[] {
  const days = new Map<string, Day>();
  for (const event of events) {
    const key = berlinDateKey(event.start);
    const day = days.get(key) ?? { key, date: event.start, events: [] };
    day.events.push(event);
    days.set(key, day);
  }
  return [...days.values()]
    .sort((a, b) => b.key.localeCompare(a.key))
    .map((d) => ({ ...d, events: d.events.sort((a, b) => a.start.getTime() - b.start.getTime()) }));
}

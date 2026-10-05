"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { EventDialog } from "@/components/events/event-dialog";
import { berlinDateKey, formatBerlin } from "@/lib/berlin";
import { isLottery, isOverbooked, seatsLabel } from "@/lib/events";
import { phaseOf } from "@/lib/use-now";
import { WeekStatus } from "@/lib/week-status";

function relativeStart(event: EventItem, now: Date) {
  const diffMin = Math.round((event.start.getTime() - now.getTime()) / 60_000);
  if (diffMin < 60) return `in ${diffMin} Min.`;
  if (berlinDateKey(event.start) === berlinDateKey(now))
    return `heute ${formatBerlin(event.start, "HH:mm")}`;
  return formatBerlin(event.start, "EEE HH:mm");
}

/** "Jetzt / Als Nächstes" aus Entwurf 3, für die volle Breite zweispaltig. */
export function NowCard({
  events,
  now,
  status,
  className,
}: {
  events: EventItem[];
  now: Date | null;
  status: WeekStatus | null;
  className?: string;
}) {
  const base = cn(
    "grid gap-8 rounded-3xl bg-fsr-deep p-6 text-white sm:p-8 md:grid-cols-2 md:gap-12",
    className
  );
  if (!now || !status)
    return (
      <section className={base}>
        <div className="space-y-4">
          <Skeleton className="h-5 w-32 bg-white/20" />
          <Skeleton className="h-24 w-full bg-white/20" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-5 w-28 bg-white/20" />
          <Skeleton className="h-36 w-full bg-white/20" />
        </div>
      </section>
    );

  if (status.kind === "after")
    return (
      <section className={cn(base, "md:grid-cols-1")}>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Vorbei</p>
          <p className="text-3xl font-bold">Das war die Ersti-Woche 2026!</p>
          <p className="text-white/80">Danke, dass ihr dabei wart. Weitere Termine findet ihr im Kalender.</p>
          <Button asChild variant="secondary" className="self-start">
            <Link href="/kalender">Zum Kalender</Link>
          </Button>
        </div>
      </section>
    );

  const live = events.filter((e) => phaseOf(e, now) === "live");
  const next = events
    .filter((e) => phaseOf(e, now) === "upcoming")
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, 3);

  return (
    <section aria-label="Jetzt und als Nächstes" className={base}>
      {status.kind === "before" ? (
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Countdown</p>
          <p className="mt-2 text-5xl font-black tabular-nums">
            {status.daysUntil} {status.daysUntil === 1 ? "Tag" : "Tage"}
          </p>
          <p className="text-white/80">bis zum Start der Ersti-Woche</p>
        </div>
      ) : (
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/70">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-white" />
            </span>
            Jetzt · {formatBerlin(now, "HH:mm")} Uhr
          </p>
          {live.length === 0 && (
            <p className="mt-3 text-2xl font-bold">Gerade läuft nichts – Zeit zum Durchatmen.</p>
          )}
          <ul className="mt-3 space-y-3">
            {live.map((e) => {
              const progress =
                ((now.getTime() - e.start.getTime()) / (e.end.getTime() - e.start.getTime())) * 100;
              return (
                <li key={e.id}>
                  <EventDialog event={e} phase="live">
                    <button type="button" className="w-full rounded-2xl bg-white/10 p-4 text-left transition hover:bg-white/15">
                      <span className="block text-2xl font-bold leading-tight">{e.title}</span>
                      <span className="mt-1 block text-sm text-white/80">noch bis {formatBerlin(e.end, "HH:mm")} Uhr</span>
                      <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-white/20">
                        <span className="block h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
                      </span>
                    </button>
                  </EventDialog>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {next.length > 0 && (
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Als Nächstes</p>
          <ul className="mt-2 divide-y divide-white/15">
            {next.map((e) => (
              <li key={e.id}>
                <EventDialog event={e} phase="upcoming">
                  <button type="button" className="flex w-full items-center justify-between gap-4 py-3 text-left hover:opacity-90">
                    <span className="min-w-0">
                      <span className="block font-semibold">{e.title}</span>
                      {e.registrable && (
                        <span className="text-xs text-white/70">
                          {seatsLabel(e)}
                          {isLottery(e) && !isOverbooked(e) && " · Losverfahren"}
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tabular-nums">
                      {relativeStart(e, now)}
                    </span>
                  </button>
                </EventDialog>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

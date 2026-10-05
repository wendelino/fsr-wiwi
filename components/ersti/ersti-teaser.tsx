"use client";

import { getWeekDays, weekRangeLabel } from "@/lib/berlin";
import { ERSTI_DAYS, ERSTI_PAGE, ERSTI_START } from "@/lib/ersti";
import { useNow } from "@/lib/use-now";
import { cn } from "@/lib/utils";
import { getWeekStatus } from "@/lib/week-status";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

/** Kleiner Hinweis auf die Ersti-Woche, z. B. im Hero der Startseite. */
export function ErstiTeaser({ className }: { className?: string }) {
  const days = useMemo(() => getWeekDays(ERSTI_START, ERSTI_DAYS), []);
  const status = getWeekStatus(days, useNow());
  const label = !status
    ? weekRangeLabel(days)
    : status.kind === "during"
      ? `Läuft gerade · Tag ${status.dayIndex + 1} von ${ERSTI_DAYS}`
      : status.kind === "before"
        ? status.daysUntil === 1
          ? "Morgen geht's los"
          : `In ${status.daysUntil} Tagen · ${weekRangeLabel(days)}`
        : weekRangeLabel(days);

  return (
    <Link
      href={ERSTI_PAGE}
      data-umami-event="E-Teaser-Home"
      className={cn(
        "group inline-flex max-w-full items-center gap-3 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 text-sm ring-1 ring-white/20 backdrop-blur transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
        className
      )}
    >
      <span className="shrink-0 rounded-full bg-fsr-deep px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
        Ersti-Woche
      </span>
      <span className="truncate font-medium">{label}</span>
      <ArrowRight className="size-4 shrink-0 transition group-hover:translate-x-0.5" />
    </Link>
  );
}

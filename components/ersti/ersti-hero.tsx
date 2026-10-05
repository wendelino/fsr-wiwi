"use client";

import { FullBleed } from "@/components/full-bleed";
import { Button } from "@/components/ui/button";
import { formatBerlin, getWeekDays } from "@/lib/berlin";
import { ERSTI_DAYS, ERSTI_GUIDE, ERSTI_START } from "@/lib/ersti";
import { phaseOf, useNow } from "@/lib/use-now";
import { cn } from "@/lib/utils";
import { getWeekStatus } from "@/lib/week-status";
import { ArrowRight, FileText } from "lucide-react";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Marquee from "react-fast-marquee";

/**
 * Bordeaux-Hero der Ersti-Woche über die volle Breite, mit Laufband aller Termine.
 * Muss das erste Element der Seite sein.
 */
export function ErstiHero({
  events,
  programHref,
  showStatus = false,
}: {
  events: EventItem[];
  /** Ziel von "Programm ansehen" */
  programHref: string;
  /** Live-Status (Countdown / Tag x von 5) im Hero anzeigen */
  showStatus?: boolean;
}) {
  const days = useMemo(() => getWeekDays(ERSTI_START, ERSTI_DAYS), []);
  const reduceMotion = useReducedMotion();
  const isAnchor = programHref.startsWith("#");

  return (
    <FullBleed>
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
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/25 backdrop-blur">
                {formatBerlin(days[0].date, "dd.")}–{formatBerlin(days[ERSTI_DAYS - 1].date, "dd.MM.yyyy")} · Halle (Saale)
              </span>
              {showStatus && <HeroStatus events={events} days={days} />}
            </div>
            <h1 className="mt-6 text-[clamp(3.6rem,14vw,9rem)] font-black uppercase leading-[0.85] tracking-tighter">
              Ersti
              <br />
              <span className="text-transparent [-webkit-text-stroke:2px_white]">Woche</span>{" "}
              {ERSTI_START.slice(2, 4)}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/85">
              Fünf Tage Touren, Sport, Workshops, Kneipenabende und Partys –
              euer Start ins Studium, organisiert vom FSR WiWi.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-fsr-deep hover:bg-white/90">
                {isAnchor ? (
                  <a href={programHref}>Programm ansehen</a>
                ) : (
                  <Link href={programHref} data-umami-event="E-Hero-Programm">
                    Programm ansehen <ArrowRight className="ml-2 size-4" />
                  </Link>
                )}
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
              <Image src="/logo.png" alt="Logo des FSR WiWi" width={340} height={340} priority />
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
    </FullBleed>
  );
}

function HeroStatus({ events, days }: { events: EventItem[]; days: ReturnType<typeof getWeekDays> }) {
  const now = useNow();
  const status = getWeekStatus(days, now);
  // Feste Höhe, damit nach dem Mount nichts springt
  const base =
    "inline-flex min-h-9 items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-fsr-deep";
  if (!status || status.kind === "after") return null;
  if (status.kind === "before")
    return (
      <span className={base}>
        {status.daysUntil === 1 ? "Morgen geht's los!" : `Noch ${status.daysUntil} Tage`}
      </span>
    );
  const live = events.find((e) => phaseOf(e, now) === "live");
  return (
    <span className={cn(base, "max-w-full")}>
      <span className="relative flex size-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fsr-deep opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-fsr-deep" />
      </span>
      <span className="truncate">
        Tag {status.dayIndex + 1} von {ERSTI_DAYS}
        {live && <span className="font-medium"> · Jetzt: {live.title}</span>}
      </span>
    </span>
  );
}

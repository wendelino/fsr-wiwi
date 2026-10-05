"use client";

import { LotteryNote } from "@/components/events/event-status";
import { ProgressBar } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { formatBerlin, timeRange } from "@/lib/berlin";
import {
  eventHref,
  isFull,
  isOverbooked,
  plainText,
  plural,
  signupButtonLabel,
  signupCount,
} from "@/lib/events";
import { Phase } from "@/lib/use-now";
import { cn, handleSafeCalendar } from "@/lib/utils";
import { CalendarPlus, Ticket } from "lucide-react";
import Link from "next/link";

/** Karte mit Datum, Platz-Balken und Anmelde-Button (Highlights, Anmeldeseite); Details auf /kalender/[slug]. */
export function SignupCard({
  event,
  phase,
  source,
}: {
  event: EventItem;
  phase: Phase;
  /** Kennung für Umami, z. B. "ERSTI" */
  source: string;
}) {
  const full = isFull(event);
  const past = phase === "past";
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition hover:border-fsr/40 hover:shadow-md",
        past && "opacity-60"
      )}
    >
      <div className="flex items-center gap-4 bg-fsr/10 p-5">
        <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-fsr-deep text-white transition duration-300 group-hover:-rotate-6 motion-reduce:transition-none">
          <span className="text-[11px] font-bold uppercase">{formatBerlin(event.start, "EEE")}</span>
          <span className="text-2xl font-black leading-none">{formatBerlin(event.start, "dd")}</span>
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-tight">
            <Link href={eventHref(event)} className="hover:underline hover:underline-offset-4">
              {event.title}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground">
            {formatBerlin(event.start, "dd.MM.")} · {timeRange(event.start, event.end)} Uhr
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        {event.description && (
          <p className="line-clamp-3 text-sm text-muted-foreground">{plainText(event.description)}</p>
        )}
        {event.registrable && !past && <SeatBar event={event} />}
        {!past && <LotteryNote event={event} className="p-3 text-xs" />}
        <div className="mt-auto flex gap-2 pt-1">
          {!event.registrable || past ? (
            <Button variant="outline" className="flex-1" onClick={() => handleSafeCalendar(event)}>
              <CalendarPlus className="mr-2 size-4" /> In den Kalender
            </Button>
          ) : full ? (
            <Button disabled className="flex-1">Ausgebucht</Button>
          ) : (
            <Button asChild className="flex-1 bg-fsr-deep text-white hover:bg-fsr-deep/90">
              <Link href={"/anmeldung/" + event.slug} data-umami-event={`Signup-${source}-${event.slug}`}>
                <Ticket className="mr-2 size-4" /> {signupButtonLabel(event)}
              </Link>
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href={eventHref(event)}>Details</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

function SeatBar({ event }: { event: EventItem }) {
  if (event.maxGuests == null || event.restSeats == null) return null;
  const full = isFull(event);
  const overbooked = isOverbooked(event);
  const taken = Math.min(100, Math.round(((event.maxGuests - event.restSeats) / event.maxGuests) * 100));

  let left: string;
  let right: string;
  if (full) {
    left = "Ausgebucht";
    right = "100 % belegt";
  } else if (overbooked) {
    left = `${plural(signupCount(event)!, "Anmeldung", "Anmeldungen")} auf ${plural(event.maxGuests, "Platz", "Plätze")}`;
    right = "es wird gelost";
  } else {
    left = `${event.restSeats} von ${plural(event.maxGuests, "Platz", "Plätzen")} frei`;
    right = `${taken} % belegt`;
  }

  return (
    <div>
      <div className="mb-1.5 flex justify-between gap-3 text-xs font-semibold">
        <span className={full ? "text-destructive" : undefined}>{left}</span>
        <span className={overbooked ? "text-fsr" : "text-muted-foreground"}>{right}</span>
      </div>
      <ProgressBar value={taken} barClassName={full ? "bg-destructive" : undefined} />
    </div>
  );
}

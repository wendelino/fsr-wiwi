import { EventStatus } from "@/components/events/event-status";
import { timeRange } from "@/lib/berlin";
import { eventHref, plainText } from "@/lib/events";
import { Phase } from "@/lib/use-now";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/** Termin in der Kalenderliste; verlinkt auf /kalender/[slug]. */
export default function EventPreview({ event, phase }: { event: EventItem; phase: Phase }) {
  return (
    <Link
      href={eventHref(event)}
      className={cn(
        "group flex items-start gap-4 rounded-3xl border bg-card p-5 transition hover:border-fsr/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr",
        phase === "past" && "opacity-55",
        phase === "live" && "border-fsr/50 shadow-md"
      )}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold tabular-nums text-fsr">{timeRange(event.start, event.end)} Uhr</span>
        <span className="mt-1 block text-lg font-bold leading-tight">{event.title}</span>
        {event.description && (
          <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">{plainText(event.description)}</span>
        )}
        <EventStatus event={event} phase={phase} className="mt-3" />
      </span>
      <ArrowRight className="mt-1 size-5 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-fsr" />
    </Link>
  );
}

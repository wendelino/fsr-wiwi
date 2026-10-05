import { cn } from "@/lib/utils";
import { Phase } from "./use-now";

export function isFull(event: EventItem) {
  return event.registrable && event.restSeats === 0;
}

export function seatsLabel(event: EventItem) {
  if (!event.registrable) return null;
  if (event.restSeats === 0) return "Ausgebucht";
  if (event.restSeats == null) return "Anmeldung nötig";
  return `Anmeldung nötig · ${event.restSeats} ${event.restSeats === 1 ? "Platz" : "Plätze"} frei`;
}

/** Einheitliche Status-Badges: läuft gerade, Anmeldung/Plätze, ausgebucht, vorbei. */
export function EventStatus({
  event,
  phase,
  className,
}: {
  event: EventItem;
  phase: Phase;
  className?: string;
}) {
  const seats = seatsLabel(event);
  if (phase !== "live" && !seats && phase !== "past") return null;
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {phase === "live" && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-fsr-deep px-2 py-0.5 text-[11px] font-semibold text-white">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex size-1.5 rounded-full bg-white" />
          </span>
          Läuft gerade
        </span>
      )}
      {phase === "past" && (
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          Vorbei
        </span>
      )}
      {seats && phase !== "past" && (
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[11px] font-semibold",
            isFull(event)
              ? "bg-destructive/10 text-destructive"
              : "bg-fsr/10 text-fsr"
          )}
        >
          {seats}
        </span>
      )}
    </div>
  );
}

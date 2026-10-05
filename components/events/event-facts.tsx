import { formatBerlin, timeRange } from "@/lib/berlin";
import { freeSeats, isFull, isOverbooked, plural, signupCount } from "@/lib/events";
import { cn } from "@/lib/utils";

/** "Auf einen Blick": Wann und wie mit Anmeldung. */
export function EventFacts({ event, className }: { event: EventItem; className?: string }) {
  const facts: [string, string][] = [
    ["Wann", `${formatBerlin(event.start, "EEEE, dd.MM.yyyy")}\n${timeRange(event.start, event.end)} Uhr`],
    ["Anmeldung", signupFact(event)],
  ];
  return (
    <dl className={cn("divide-y", className)}>
      {facts.map(([term, value]) => (
        <div key={term} className="py-3 first:pt-0 last:pb-0">
          <dt className="text-xs font-bold uppercase tracking-widest text-fsr">{term}</dt>
          <dd className="mt-1 whitespace-pre-line font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function signupFact(event: EventItem) {
  if (!event.registrable) return "Nicht nötig – kommt einfach vorbei.";
  if (isFull(event)) return "Ausgebucht";
  if (isOverbooked(event)) {
    const count = signupCount(event);
    return count != null && event.maxGuests != null
      ? `Nötig · ${plural(count, "Anmeldung", "Anmeldungen")} auf ${plural(event.maxGuests, "Platz", "Plätze")}`
      : "Nötig · mehr Anmeldungen als Plätze";
  }
  const seats = freeSeats(event);
  if (seats == null) return "Nötig";
  return event.maxGuests != null
    ? `Nötig · ${seats} von ${event.maxGuests} Plätzen frei`
    : `Nötig · ${plural(seats, "Platz", "Plätze")} frei`;
}

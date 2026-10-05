import { HeroLead, PageHero } from "@/components/page-hero";
import { formatBerlin, timeRange } from "@/lib/berlin";
import { isFull, isLottery, isOverbooked, seatsLabel } from "@/lib/events";
import { cn } from "@/lib/utils";
import { ArrowLeft, CalendarDays, Clock, Dices } from "lucide-react";
import Link from "next/link";

/** Kopf für Termin- und Anmeldeseiten: PageHero mit Datum, Zeit und Status-Chips. */
export function EventHeader({
  event,
  eyebrow,
  back,
  past = false,
}: {
  event: EventItem;
  eyebrow: string;
  back: { href: string; label: string };
  past?: boolean;
}) {
  const seats = seatsLabel(event);
  return (
    <PageHero eyebrow={eyebrow} title={event.title} back={back}>
      <ul className="flex flex-wrap gap-2">
        <Chip icon={CalendarDays}>{formatBerlin(event.start, "EEEE, dd.MM.yyyy")}</Chip>
        <Chip icon={Clock}>{timeRange(event.start, event.end)} Uhr</Chip>
        {past ? (
          <Chip>Vorbei</Chip>
        ) : (
          <>
            {seats && (
              <Chip strong={isFull(event)} icon={isOverbooked(event) ? Dices : undefined}>
                {seats}
              </Chip>
            )}
            {isLottery(event) && !isOverbooked(event) && <Chip icon={Dices}>Losverfahren</Chip>}
          </>
        )}
      </ul>
    </PageHero>
  );
}

function Chip({
  icon: Icon,
  strong,
  children,
}: {
  icon?: typeof Clock;
  strong?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ring-1",
        strong ? "bg-white text-fsr-deep ring-white" : "bg-white/15 ring-white/25 backdrop-blur"
      )}
    >
      {Icon && <Icon className="size-4" />}
      {children}
    </li>
  );
}

/** Platzhalter, wenn es den Termin nicht (mehr) gibt. */
export function EventNotFound({ back }: { back: { href: string; label: string } }) {
  return (
    <PageHero eyebrow="404" title="Termin nicht gefunden">
      <HeroLead>Den Termin gibt es nicht oder er wurde gelöscht.</HeroLead>
      <Link
        href={back.href}
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 font-semibold text-fsr-deep transition hover:bg-white/90"
      >
        <ArrowLeft className="size-4" /> {back.label}
      </Link>
    </PageHero>
  );
}

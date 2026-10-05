import { FullBleed } from "@/components/full-bleed";
import { formatBerlin, timeRange } from "@/lib/berlin";
import { isFull, isLottery, isOverbooked, seatsLabel } from "@/lib/events";
import { cn } from "@/lib/utils";
import { ArrowLeft, CalendarDays, Clock, Dices } from "lucide-react";
import Link from "next/link";

/** Bordeaux-Kopf für Termin- und Anmeldeseiten, im Stil des Ersti-Heros. */
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
          className="pointer-events-none absolute -right-24 -top-16 hidden w-[420px] opacity-[0.07] invert md:block"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-16">
          <Link
            href={back.href}
            className="inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft className="size-4" /> {back.label}
          </Link>
          <p className="mt-8 text-sm font-bold uppercase tracking-widest text-white/70">{eyebrow}</p>
          <h1 className="mt-2 max-w-4xl text-[clamp(2.4rem,7vw,4.75rem)] font-black leading-[0.95] tracking-tight">
            {event.title}
          </h1>
          <ul className="mt-8 flex flex-wrap gap-2">
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
        </div>
      </div>
    </FullBleed>
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
    <FullBleed>
      <div className="bg-fsr-deep text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-sm font-bold uppercase tracking-widest text-white/70">404</p>
          <h1 className="mt-2 text-[clamp(2.4rem,7vw,4.75rem)] font-black leading-[0.95] tracking-tight">
            Termin nicht gefunden
          </h1>
          <p className="mt-4 max-w-lg text-lg text-white/85">
            Den Termin gibt es nicht oder er wurde gelöscht.
          </p>
          <Link
            href={back.href}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 font-semibold text-fsr-deep transition hover:bg-white/90"
          >
            <ArrowLeft className="size-4" /> {back.label}
          </Link>
        </div>
      </div>
    </FullBleed>
  );
}

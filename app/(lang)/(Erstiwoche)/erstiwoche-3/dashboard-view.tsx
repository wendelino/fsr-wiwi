"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ERSTI_DAYS, ERSTI_GUIDE, ERSTI_START, erstiSponsors } from "@/lib/ersti";
import { siteConfig } from "@/lib/siteConfig";
import { cn, handleSafeAllEventsCalendar } from "@/lib/utils";
import {
  ArrowUpRight,
  BookOpen,
  CalendarPlus,
  FileText,
  MessageCircle,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import {
  berlinDateKey,
  eventsOnDay,
  formatBerlin,
  getWeekDays,
  WeekDay,
  weekRangeLabel,
} from "../_designs/berlin";
import { EventDialog } from "../_designs/event-dialog";
import { isFull } from "../_designs/event-status";
import { SponsorStrip } from "../_designs/sponsor-strip";
import { phaseOf, useNow } from "../_designs/use-now";
import { getWeekStatus, WeekStatus } from "../_designs/week-status";
import { WeekSchedule } from "./week-schedule";

const ALTKLAUSUREN_URL =
  "https://studip.uni-halle.de/dispatch.php/course/overview?cid=ee8c88937076ac5fe253303faf816cbe";

export default function DashboardView({ events }: { events: EventItem[] }) {
  const days = useMemo(() => getWeekDays(ERSTI_START, ERSTI_DAYS), []);
  const now = useNow();
  const status = getWeekStatus(days, now);
  const todayKey = status?.kind === "during" ? status.todayKey : null;
  const openCount = events.filter(
    (e) => e.registrable && !isFull(e) && phaseOf(e, now) !== "past"
  ).length;

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-fsr">
            FSR WiWi · {weekRangeLabel(days)}
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Ersti-Woche 2026</h1>
          <p className="max-w-xl text-muted-foreground">
            Alles auf einen Blick: was gerade läuft, was als Nächstes kommt und
            wofür ihr euch anmelden müsst.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => handleSafeAllEventsCalendar(events)}
          data-umami-event="SaveCalendar-DESIGN3-all"
        >
          <CalendarPlus className="mr-2 size-4" /> Alle Termine in den Kalender
        </Button>
      </header>

      {/* Bento */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <NowNextCard className="col-span-2 md:row-span-2" events={events} now={now} status={status} />
        <WeekProgressCard className="col-span-2" days={days} events={events} status={status} />
        <Tile
          href={ERSTI_GUIDE}
          external
          icon={FileText}
          title="Ersti-Guide"
          text="Alles Wichtige zum Studienstart als PDF."
        />
        <Tile
          href="/anmeldung"
          icon={Ticket}
          title="Anmeldung"
          text={`${openCount} ${openCount === 1 ? "Termin" : "Termine"} mit freien Plätzen`}
        />
        <Tile
          className="md:col-span-2"
          href={ALTKLAUSUREN_URL}
          external
          icon={BookOpen}
          title="Altklausuren"
          text="Unsere Sammlung findest du auf StudIP."
        />
        <Tile
          className="md:col-span-2"
          href="/kontakt"
          icon={MessageCircle}
          title="Fragen?"
          text="Schreib uns übers Kontaktformular oder per Mail."
        />
      </section>

      <section id="programm" className="scroll-mt-24">
        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Wochenplan</h2>
        <WeekSchedule events={events} days={days} now={now} todayKey={todayKey} />
      </section>

      <section className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Häufige Fragen</h2>
          <p className="mt-3 text-muted-foreground">
            Noch etwas offen?{" "}
            <Link href="/kontakt" className="font-medium text-fsr underline underline-offset-4">
              Schreib uns
            </Link>
            .
          </p>
        </div>
        <Faq />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Mit Unterstützung von</h2>
        <SponsorStrip sponsors={erstiSponsors} />
      </section>
    </div>
  );
}

function relativeStart(event: EventItem, now: Date) {
  const diffMin = Math.round((event.start.getTime() - now.getTime()) / 60_000);
  if (diffMin < 60) return `in ${diffMin} Min.`;
  if (berlinDateKey(event.start) === berlinDateKey(now))
    return `heute ${formatBerlin(event.start, "HH:mm")}`;
  return formatBerlin(event.start, "EEE HH:mm");
}

function NowNextCard({
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
  const base = cn("flex flex-col gap-6 rounded-3xl bg-fsr-deep p-6 text-white sm:p-8", className);
  if (!now || !status)
    return (
      <div className={base}>
        <Skeleton className="h-6 w-24 bg-white/20" />
        <Skeleton className="h-16 w-full bg-white/20" />
        <Skeleton className="h-24 w-full bg-white/20" />
      </div>
    );

  if (status.kind === "after")
    return (
      <div className={base}>
        <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Vorbei</p>
        <p className="text-3xl font-bold">Das war die Ersti-Woche 2026!</p>
        <p className="text-white/80">Danke, dass ihr dabei wart. Weitere Termine findet ihr im Kalender.</p>
        <Button asChild variant="secondary" className="self-start">
          <Link href="/kalender">Zum Kalender</Link>
        </Button>
      </div>
    );

  const live = events.filter((e) => phaseOf(e, now) === "live");
  const next = events
    .filter((e) => phaseOf(e, now) === "upcoming")
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, 3);

  return (
    <div className={base}>
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
        <div className="mt-auto">
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
                          {isFull(e) ? "Ausgebucht" : "Anmeldung nötig"}
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
    </div>
  );
}

function WeekProgressCard({
  days,
  events,
  status,
  className,
}: {
  days: WeekDay[];
  events: EventItem[];
  status: WeekStatus | null;
  className?: string;
}) {
  const current = status?.kind === "during" ? status.dayIndex : status?.kind === "after" ? days.length : -1;
  const title = !status
    ? " "
    : status.kind === "during"
      ? `Tag ${status.dayIndex + 1} von ${days.length}`
      : status.kind === "before"
        ? "Bald geht's los"
        : "Geschafft!";
  const todayEvents = status?.kind === "during" ? eventsOnDay(events, status.todayKey) : [];

  return (
    <div className={cn("rounded-3xl border bg-card p-6", className)}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <p className="text-2xl font-bold">{title}</p>
        {status?.kind === "during" && (
          <p className="text-sm text-muted-foreground">
            heute {todayEvents.length} Termine, {todayEvents.filter((e) => e.registrable).length} mit Anmeldung
          </p>
        )}
      </div>
      <ol className="mt-5 grid grid-cols-5 gap-2">
        {days.map((day, i) => (
          <li key={day.key}>
            <span
              className={cn(
                "block h-2 rounded-full",
                i < current ? "bg-fsr-deep" : i === current ? "bg-fsr-deep/50" : "bg-muted"
              )}
            />
            <span className={cn("mt-2 block text-xs", i === current ? "font-bold text-fsr" : "text-muted-foreground")}>
              {formatBerlin(day.date, "EEE")}
              <span className="hidden sm:inline"> · {eventsOnDay(events, day.key).length}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Tile({
  href,
  external,
  icon: Icon,
  title,
  text,
  className,
}: {
  href: string;
  external?: boolean;
  icon: typeof FileText;
  title: string;
  text: string;
  className?: string;
}) {
  const content = (
    <>
      <span className="flex items-start justify-between">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-fsr/10 text-fsr">
          <Icon className="size-5" />
        </span>
        <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fsr" />
      </span>
      <span className="mt-4 block font-bold">{title}</span>
      <span className="block text-sm text-muted-foreground">{text}</span>
    </>
  );
  const cls = cn(
    "group block rounded-3xl border bg-card p-5 transition hover:border-fsr/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr",
    className
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

function Faq() {
  const { mail, strasse, plz, ort } = siteConfig.company;
  const items = [
    {
      q: "Muss ich mich für alles anmelden?",
      a: (
        <>
          Nein. Nur Termine mit dem Hinweis „Anmeldung nötig“ haben begrenzte Plätze – dafür meldest du dich auf der{" "}
          <Link href="/anmeldung" className="underline">Anmeldeseite</Link> an. Alle anderen Programmpunkte sind offen:
          einfach vorbeikommen.
        </>
      ),
    },
    {
      q: "Wo finde ich alle Infos zum Studienstart?",
      a: (
        <>
          Im{" "}
          <a href={ERSTI_GUIDE} target="_blank" rel="noopener noreferrer" className="underline">Ersti-Guide (PDF)</a>{" "}
          haben wir das Wichtigste für euren Start zusammengefasst.
        </>
      ),
    },
    {
      q: "Wie bekomme ich die Termine in meinen Kalender?",
      a: "Über „Alle Termine in den Kalender“ lädst du eine .ics-Datei mit dem ganzen Programm herunter. Einzelne Termine speicherst du im Detailfenster eines Termins.",
    },
    {
      q: "Wo finde ich Altklausuren?",
      a: (
        <>
          Auf StudIP unter{" "}
          <a href={ALTKLAUSUREN_URL} target="_blank" rel="noopener noreferrer" className="underline">
            Fachschaftsrat Wirtschaftswissenschaften (FSR WiWi) / Econ Students Council
          </a>
          .
        </>
      ),
    },
    {
      q: "Wer organisiert die Ersti-Woche – und kann ich mitmachen?",
      a: "Der Fachschaftsrat Wirtschaftswissenschaften, die gewählte Vertretung der WiWi-Studierenden. Unsere Sitzungen sind öffentlich: jeden zweiten Dienstag um 19 Uhr in der Großen Steinstraße 73, Raum 201.",
    },
    {
      q: "Wie erreiche ich euch?",
      a: (
        <>
          Über das <Link href="/kontakt" className="underline">Kontaktformular</Link>, per Mail an{" "}
          <a href={`mailto:${mail}`} className="underline">{mail}</a> oder vor Ort: {strasse}, {plz} {ort}.
        </>
      ),
    },
  ];
  return (
    <Accordion type="single" collapsible className="rounded-3xl border bg-card px-6">
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`q${i}`} className={i === items.length - 1 ? "border-b-0" : undefined}>
          <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

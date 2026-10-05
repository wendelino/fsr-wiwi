import { formatInTimeZone } from "date-fns-tz";
import { de } from "date-fns/locale";

const BERLIN_TZ = "Europe/Berlin";

export const formatBerlin = (date: Date, formatStr: string) =>
  formatInTimeZone(date, BERLIN_TZ, formatStr, { locale: de });

export const berlinDateKey = (date: Date) => formatBerlin(date, "yyyy-MM-dd");

export const berlinMinutesOfDay = (date: Date) => {
  const [h, m] = formatBerlin(date, "HH:mm").split(":").map(Number);
  return h * 60 + m;
};

/** "10:00–12:00", Endzeit um Mitternacht als 24:00. */
export function timeRange(start: Date, end: Date) {
  const endsAtMidnight =
    berlinDateKey(end) !== berlinDateKey(start) &&
    formatBerlin(end, "HH:mm") === "00:00";
  return `${formatBerlin(start, "HH:mm")}–${endsAtMidnight ? "24:00" : formatBerlin(end, "HH:mm")}`;
}

export type WeekDay = { key: string; date: Date };

/** Aufeinanderfolgende Berliner Kalendertage ab startKey (yyyy-MM-dd). */
export function getWeekDays(startKey: string, count: number): WeekDay[] {
  const [year, month, day] = startKey.split("-").map(Number);
  return Array.from({ length: count }, (_, i) => {
    // 12:00 UTC liegt in Berlin immer am selben Kalendertag
    const date = new Date(Date.UTC(year, month - 1, day + i, 12));
    return { key: berlinDateKey(date), date };
  });
}

export function eventsOnDay(events: EventItem[], dayKey: string) {
  return events
    .filter((e) => berlinDateKey(e.start) === dayKey)
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}

/** Zeitraum der Woche, z. B. "05.–09. Oktober 2026". */
export function weekRangeLabel(days: WeekDay[]) {
  const first = days[0].date;
  const last = days[days.length - 1].date;
  return `${formatBerlin(first, "dd.")}–${formatBerlin(last, "dd. MMMM yyyy")}`;
}

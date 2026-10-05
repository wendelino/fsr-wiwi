import { berlinDateKey, WeekDay } from "@/lib/berlin";

export type WeekStatus =
  | { kind: "before"; daysUntil: number }
  | { kind: "during"; dayIndex: number; todayKey: string }
  | { kind: "after" };

const keyToUtc = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};

/** Wo stehen wir relativ zur Woche? null solange die Zeit noch unbekannt ist (SSR). */
export function getWeekStatus(days: WeekDay[], now: Date | null): WeekStatus | null {
  if (!now) return null;
  const todayKey = berlinDateKey(now);
  const dayIndex = days.findIndex((d) => d.key === todayKey);
  if (dayIndex >= 0) return { kind: "during", dayIndex, todayKey };
  if (todayKey < days[0].key) {
    const daysUntil = Math.round(
      (keyToUtc(days[0].key) - keyToUtc(todayKey)) / 86_400_000
    );
    return { kind: "before", daysUntil };
  }
  return { kind: "after" };
}

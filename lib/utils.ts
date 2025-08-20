import { DayProps } from "@/components/Day";
import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupEventsByDay(events: EventItem[] | undefined): DayProps[] {
  if (!events) return [];

  const groupedEvents = events.reduce<Record<string, EventItem[]>>(
    (acc, event) => {
      const dateKey = format(event.start, "yyyy-MM-dd"); // use sortable format directly
      (acc[dateKey] ||= []).push(event); // conditional initialization with push
      return acc;
    },
    {}
  );

  return Object.entries(groupedEvents)
    .map(([date, events]) => ({ date, events })) // map directly to DayProps
    .sort((b, a) => a.date.localeCompare(b.date)); // lexicographical sort with consistent date format
}

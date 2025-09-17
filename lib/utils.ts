import { DayProps } from "@/components/Day";
import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { createEvent } from "ics";
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


export const handleSafeCalendar = (event: EventItem) => {
  const icsEvent: any = {
    start: [
      event.start.getFullYear(),
      event.start.getMonth() + 1,
      event.start.getDate(),
      event.start.getHours(),
      event.start.getMinutes(),
    ],
    end: [
      event.end.getFullYear(),
      event.end.getMonth() + 1,
      event.end.getDate(),
      event.end.getHours(),
      event.end.getMinutes(),
    ],
    title: event.title,
    description: event.description,
    status: "CONFIRMED",
    busyStatus: "BUSY",
  };

  createEvent(icsEvent, (error, value) => {
    if (error) {
      console.error(error);
      return;
    }

    const blob = new Blob([value], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "events.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
};
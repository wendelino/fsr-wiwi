import { getEvents } from "@/app/_actions/event";
import Countdown from "@/components/CountDown";
import DayCard, { DayProps } from "@/components/Day";
import { EventProps, EventWithLocation } from "@/components/Event";
import { ListItem } from "@/components/Framer/ListItem";
import { PageHeader } from "@/components/Framer/PageHeader";
import { Section } from "@/components/Framer/Section";
import { Header } from "@/components/TextComponents";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const events = await getEvents();
  const days: DayProps[] = groupEventsByDay(events);

  return (
    <>
      <PageHeader
        title="Eventkalender"
        subtitle={"Bleib auf dem Laufenden über die neuesten Veranstaltungen"}
      />
      {days.map((day) => (
        <Section key={day.date}>
          <div className="flex items-center gap-4 text-lg font-semibold">
            {day.date}
            <div className="border-t border-foreground flex-1" />
          </div>
          {day.events.map((event, index) => (
            <ListItem index={index} key={index}>
              <Link
                href={`kalender/${encodeURIComponent(event.title)}`}
                className="border-b py-5 flex items-center cursor-pointer"
              >
                <div className="flex flex-col gap-1 ">
                  <span className="underline text-fsr font-semibold ">
                    {event.title}
                  </span>
                  <span className="flex gap-2">
                    <span className="text-foreground/70">
                      {format(event.start, "HH:mm")}-
                      {format(event.end, "HH:mm")}
                    </span>
                    {event.description.slice(0, 60)}...
                  </span>
                </div>

                <ChevronRight className="ml-auto w-6 h-6" />
              </Link>
            </ListItem>
          ))}
        </Section>
      ))}
    </>
  );
}

function groupEventsByDay(events: EventWithLocation[] | undefined): DayProps[] {
  if (!events) {
    return [];
  }

  const groupedEvents: Record<string, EventWithLocation[]> = events.reduce(
    (acc, event) => {
      const dateKey = format(event.start, "dd.MM.yyyy"); // YYYY-MM-DD
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, EventWithLocation[]>
  );

  const days = Object.keys(groupedEvents).map((date) => ({
    date,
    events: groupedEvents[date],
  }));

  // Sortiere die Tage nach Datum
  days.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return days;
}

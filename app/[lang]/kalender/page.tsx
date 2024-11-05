import { getEvents } from "@/app/_actions/event";
import { DayProps } from "@/components/Day";
import { EventProps, EventWithLocation } from "@/components/Event";
import { ListItem } from "@/components/Framer/ListItem";
import { PageHeader } from "@/components/Framer/PageHeader";
import { Section } from "@/components/Framer/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Content />
    </Suspense>
  );
}

function Loading() {
  return (
    <>
      <PageHeader loading />
      {Array.from({ length: 5 }, (_, i) => (
        <div className="space-y-4" key={i}>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </>
  );
}

async function Content() {
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
            {format(day.date, "dd.MM.yyyy")}
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
  if (!events) return [];

  const groupedEvents = events.reduce<Record<string, EventWithLocation[]>>(
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

"use client";

import { getEvents } from "@/app/_actions/event";
import EventPreview from "./event-preview";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import { DayProps } from "@/components/Day";
import { format } from "date-fns";
import { ListItem } from "@/components/Framer/ListItem";
import { Section } from "@/components/Framer/Section";

export default function InfiniteScroll({
  initialEvents,
  initialCursor,
}: {
  initialEvents: EventItem[];
  initialCursor: string | null;
}) {
  const [events, setEvents] = useState(initialEvents);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialCursor !== null);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setLoading(true);
      getEvents({page}).then(({ events, nextCursor }) => {
        setEvents((prevEvents) => [...prevEvents, ...events]);
        setHasMore(nextCursor !== null);
        setCursor(nextCursor);
        setPage(page + 1);
        setLoading(false);
      });
    }
  }, [inView]);

  return (
    <div className="space-y-12 w-full ">
      {/* {events.map((event) => (
        <EventPreview key={event.id} event={event} />
      ))} */}
      {groupEventsByDay(events).map((day) => (
        <Section key={day.date} className="w-full ">
          <div className="flex items-center gap-4 text-lg font-semibold">
            {format(day.date, "dd.MM.yyyy")}
            <div className="border-t border-foreground flex-1" />
          </div>
          {day.events.map((event, index) => (
            <ListItem index={index} key={index}>
              <EventPreview key={event.id} event={event} className={index === day.events.length - 1 ? "border-b-0" : "border-b"} />
            </ListItem>
          ))}
        </Section>
      ))}
      {hasMore ? (
        <>
          <div className="space-y-4" ref={ref}>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          {Array.from({ length: 5 }, (_, i) => (
            <div className="space-y-4" key={i}>
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </>
      ) : (
        <div className="h-10 text-muted-foreground text-sm text-center">
          - {events.length} Ereignisse angezeigt, mehr gibt es nicht -
        </div>
      )}
    </div>
  );
}
function groupEventsByDay(events: EventItem[] | undefined): DayProps[] {
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

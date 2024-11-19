import { getEvents } from "@/app/_actions/event";
import { DayProps } from "@/components/Day";
import { EventWithLocation } from "@/components/Event";
import { ListItem } from "@/components/Framer/ListItem";
import { PageHeader } from "@/components/Framer/PageHeader";
import { Section } from "@/components/Framer/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata= {
  title: "Eventkalender",
  description:
    "Bleib auf dem Laufenden über die neuesten Veranstaltungen",
  openGraph: {
    title: "Eventkalender",
    description:
      "Bleib auf dem Laufenden über die neuesten Veranstaltungen",
    url: "https://fsr-wiwi-halle.de/kalender",
    siteName: "Fachschaftsrat Wirtschaftswissenschaften",
    images: [
      {
        url: "https://fsr-wiwi-halle.de/logo.png",
        width: 1200,
        height: 630,
        alt: "Eventkalender",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventkalender",
    description:
      "Bleib auf dem Laufenden über die neuesten Veranstaltungen",
    images: ["https://fsr-wiwi-halle.de/logo.png"],
  },
};



export default function Page() {
  return (
    <>
      <PageHeader
        title="Eventkalender"
        subtitle={"Bleib auf dem Laufenden über die neuesten Veranstaltungen"}
      /> 
      <Suspense fallback={<Loading />}>
        <Content />
      </Suspense>
    </>
  );
}

function Loading() {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <div className="space-y-4" key={i}>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-3/4" />
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
                <div>
                  <h4 className="underline text-fsr font-semibold mb-1">
                    {event.title}
                  </h4>
                  <span className="text-foreground/70 mr-2">
                    {format(event.start, "HH:mm")}-{format(event.end, "HH:mm")}
                  </span>
                  {event.description.slice(0, 60)}...
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

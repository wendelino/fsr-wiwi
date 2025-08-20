import { getEvents } from "@/app/_actions/event";
import Countdown from "@/components/CountDown";
import DayCard, { DayProps } from "@/components/Day";
import { EventProps, EventWithLocation } from "@/components/Event";
import { Header } from "@/components/TextComponents"; 

export default async function page() {
  const {events} = await getEvents({ tag: "ersti25", limit: 100 });
  const days: DayProps[] = groupEventsByDay(events);

  return (
    <div>
      <Countdown />

      <Header>
        Unser <span className="fsr-gradient">Programm</span> für euch
      </Header>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {days.map((e, index) => (
          <DayCard key={index} day={e} />
        ))}
      </div>
    </div>
  );
}

function groupEventsByDay(events: EventItem[] | undefined): DayProps[] {
  if (!events) {
    return [];
  }

  const groupedEvents: Record<string, EventItem[]> = events.reduce(
    (acc, event) => {
      const dateKey = event.start.toISOString().split("T")[0]; // YYYY-MM-DD
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, EventItem[]>
  );

  const days = Object.keys(groupedEvents).map((date) => ({
    date,
    events: groupedEvents[date],
  }));

  // Sortiere die Tage nach Datum
  days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return days;
}

import { format } from "date-fns";
import { de } from "date-fns/locale";
import EventCard, { EventProps } from "./Event";

export interface DayProps {
  date: string;
  events: EventProps[];
}

export default function DayCard({ day }: { day: DayProps }) {
  const sortedEvents = [...day.events].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());


  return (
    <div className="  flex flex-col gap-4">
      <div className=" font-semibold flex flex-col">
        <span>{format(day.date, "EEEE", { locale: de })}</span>
        <span className="text-sm font-light">
          {format(day.date, "dd.MM.yyyy")}
        </span>
      </div>

      {sortedEvents.map((e, index) => (
        <EventCard event={e} key={index} />
      ))}
    </div>
  );
}

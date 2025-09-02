import { format } from "date-fns";
import { de } from "date-fns/locale"; 

interface WeekGridProps {
  events: EventItem[];
  startDate: Date; // Monday of the week
}

export default function WeekGrid({ events, startDate }: WeekGridProps) {
  // Generate array of weekdays (Mon-Fri)
  const weekDays = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });

  // Time slots from 8:00 to 20:00
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const time = new Date();
    time.setHours(8 + i, 0, 0);
    return time;
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header row with weekdays */}
        <div className="grid grid-cols-[60px_repeat(5,1fr)]">
          <div className="h-16" /> {/* Empty corner cell */}
          {weekDays.map((day) => (
            <div 
              key={day.toISOString()} 
              className="h-16 border-b border-gray-200 p-2 text-center"
            >
              <div className="font-semibold">
                {format(day, "EEEE", { locale: de })}
              </div>
              <div className="text-sm text-gray-500">
                {format(day, "dd.MM.yyyy")}
              </div>
            </div>
          ))}
        </div>

        {/* Time slots and event grid */}
        {timeSlots.map((time) => (
          <div 
            key={time.toISOString()} 
            className="grid grid-cols-[60px_repeat(5,1fr)]"
          >
            {/* Time column */}
            <div className="border-r border-b border-gray-200 p-2 text-sm">
              {format(time, "HH:mm")}
            </div>

            {/* Day columns */}
            {weekDays.map((day) => {
              const dayEvents = events.filter(event => {
                const eventDate = new Date(event.start);
                return (
                  eventDate.getDate() === day.getDate() &&
                  eventDate.getMonth() === day.getMonth() &&
                  eventDate.getHours() === time.getHours()
                );
              });

              return (
                <div 
                  key={day.toISOString()} 
                  className="border-b border-r border-gray-200 p-1 "
                >
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-blue-100 p-1 text-sm rounded mb-1 cursor-pointer hover:bg-blue-200"
                      title={event.description}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

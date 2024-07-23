import Countdown from "@/components/CountDown";
import DayCard, { DayProps } from "@/components/Day";
import EventCard, { EventProps } from "@/components/Event";
import { Header } from "@/components/TextComponents"; 

export default function Page() {
  const events: EventProps[] = [
    {
      name: "Imma-Feier und Campus Open Air –> Sport-Kurse und Kneipen-Tour für Master und Internationals",
      start: new Date("2024-10-01T10:00:00"),
      end: new Date("2024-10-01T23:59:59"),
      tag: ["Master only"],
      location: {
        name: "Heide-Campus",
        maps_link: "https://maps.app.goo.gl/snXbs6RBVPqgcica7",
      },
    },
    {
      name: "Einführungsveranstaltung",
      description:
        "Hier erklären wir dir alles, was du für den perfekten Start in dein Studium wissen musst",
      start: new Date("2024-10-02T10:00:00"),
      end: new Date("2024-10-02T11:00:00"),
      tag: ["Wichtig!"],
      location: {
        name: "Audimax",
        maps_link:
          "https://www.google.com/maps/search/?api=1&query=Delitzscher+Str+36,06112",
      },
    },
    {
      name: "Kennenlern-Spiele in Gruppen (non-alcoholic)",
      start: new Date("2024-10-02T11:30:00"),
      end: new Date("2024-10-02T12:30:00"),
    },
    {
      name: "Mittagspause / Mensa - Besuch",
      start: new Date("2024-10-02T12:30:00"),
      end: new Date("2024-10-02T14:30:00"),
    },
    {
      name: "StudIP-Einführung und Infos rundum den Studienanfang",
      start: new Date("2024-10-02T14:30:00"),
      end: new Date("2024-10-02T15:30:00"),
    },
    {
      name: "Ersti-Party",
      start: new Date("2024-10-02T19:00:00"),
      end: new Date("2024-10-02T23:59:59"),
    },
    {
      name: "Interaktive Workshops (Awareness, Unistuff, Hochschulepolitik, aktivistische Gruppen, AKW etc.)",
      start: new Date("2024-10-03T10:00:00"),
      end: new Date("2024-10-03T13:00:00"),
    },
    {
      name: "Grillen im Innenhof",
      start: new Date("2024-10-03T13:00:00"),
      end: new Date("2024-10-03T14:30:00"),
    },
    {
      name: "Speedmeeting",
      start: new Date("2024-10-03T14:30:00"),
      end: new Date("2024-10-03T16:30:00"),
      tag: ["Anmeldepflichtig"],
    },
    {
      name: "Chillen im Park",
      start: new Date("2024-10-03T16:30:00"),
      end: new Date("2024-10-03T19:00:00"),
    },
    {
      name: "Gruppenaktivitäten in der Fakultät (vers. Themes für vers. Räume)",
      start: new Date("2024-10-03T19:00:00"),
      end: new Date("2024-10-03T22:00:00"),
    },
    {
      name: "Sport-Kurse Bachelor",
      start: new Date("2024-10-04T10:00:00"),
      end: new Date("2024-10-04T13:00:00"),
    },
    {
      name: "Stadtrallye",
      start: new Date("2024-10-04T13:00:00"),
      end: new Date("2024-10-04T23:59:59"),
      tag: ["non-alcoholic", "Anmeldepflichtig"],
    },
    {
      name: "Innenhof mit Döner-Koop",
      start: new Date("2024-10-04T16:30:00"),
      end: new Date("2024-10-04T19:00:00"),
    },
    {
      name: "Hörsaal-Karaoke",
      start: new Date("2024-10-04T19:00:00"),
      end: new Date("2024-10-04T23:59:59"),
    },
  ];

  const days: DayProps[] = groupEventsByDay(events);

  return (
    <div>
      <Countdown />

      <Header>
        Unser <span className="fsr-gradient">Programm</span> für euch
      </Header> 
      
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {days.map((e, index) => (
          <DayCard key={index} day={e} />
        ))}
      </div>
    </div>
  );
}

function groupEventsByDay(events: EventProps[] | undefined): DayProps[] {
  if (!events) {
    return [];
  }

  const groupedEvents: Record<string, EventProps[]> = events.reduce(
    (acc, event) => {
      const dateKey = event.start.toISOString().split("T")[0]; // YYYY-MM-DD
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, EventProps[]>
  );

  const days = Object.keys(groupedEvents).map((date) => ({
    date,
    events: groupedEvents[date],
  }));

  // Sortiere die Tage nach Datum
  days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return days;
}

import { getEvents } from "@/app/_actions/event";
import Countdown from "@/components/CountDown";
import { DayProps } from "@/components/Day";
import SponsorGrid, { SponsorOfferGrid } from "@/components/SponsorGrid";
import { Header } from "@/components/TextComponents";
import WeekGrid from "@/components/weekgrid/weekgrid";
import ErstiInfo from "./info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ersti-Woche",
  description: "Alles über die Ersti-Woche 2025",
  openGraph: {
    title: "Ersti-Woche",
    description: "Alles über die Ersti-Woche 2025",
  },
  twitter: {
    title: "Ersti-Woche",
    description: "Alles über die Ersti-Woche 2025",
  },
};

export default async function page() {
  const { events } = await getEvents({ tag: "ersti25", limit: 100 });
  const days: DayProps[] = groupEventsByDay(events);

  const sponsors = [
    {
      src: "schogetten-logo.png",
      href: "https://example.com",
      label: "Schogetten",
    },
    {
      src: "buehnen.jpg",
      href: "https://www.buehnen-halle.de",
      label: "Bühnen Halle",
    },
    {
      src: "leuchtturm.svg",
      href: "https://leuchtturm1917.de",
      label: "Leuchtturm1917",
    },
    {
      src: "lioko.svg",
      href: "https://www.lioko-mexikaner.de",
      label: "Lioko-Mexikaner",
    },
    { src: "nabio.svg", href: "https://nabio.de", label: "Nabio" },
    {
      src: "wilkinson.png",
      href: "https://wilkinsonsword.de",
      label: "Wilkinson Sword",
    },
    { src: "freitag.jpg", href: "https://freitag.ch/de_DE", label: "Freitag" },
    {
      src: "carla.png",
      href: "https://carlundcarla.de",
      label: "CarlundCarla.de",
    },
    { src: "partyfly.svg", href: "https://partyfly.de", label: "Partyfly" },
    { src: "wgheld.png", href: "https://wgheld.de", label: "WG-Held" },
    { src: "heinz.svg", href: "https://www.heinz.com/de-DE", label: "Heinz" },
  ];

  const offers = [
    {
      link: "https://freitag.ch/mission/community/smart-brains",
      image: "freitag-deal.jpg",
      label: "Freitag Deal",
      text: "SMART BAGS FOR SMART BRAINS: Studierende, Lernende und Schüler*innen sparen bis zum 15. Oktober 25% auf vier ausgewählte FREITAG Taschen. Jetzt zugreifen und nachhaltig in deine Zukunft investieren!",
    },
    {
      link: "https://www.buehnen-halle.de/de/program/sein-oder-nichtsein-to-be-or-not-to-be/253233",
      image: "buehnen_o.jpg",
      label:
        "Sein oder Nichtsein - Komödie von Nick Whitby nach dem Film von Ernst Lubitsch",
      text: "Am Polski-Theater in Warschau läuft alles wie gewohnt – bis die deutsche Besatzung 1939 das Spiel abrupt verändert. Ausgerechnet eine Schauspieltruppe wird nun in einen gefährlichen Spionagefall verwickelt: Eine geheime Liste von Widerstandskämpfern darf nicht in die Hände der Nazis fallen. Die einzige Waffe der Schauspielerinnen und Schauspieler ist ihr Können – und so wird Verkleidung zur Überlebensstrategie. Mit viel Tempo, Witz und klugem Theatergeist zeigt die Inszenierung von Tobias Materna, wie aus Spiel bitterer Ernst werden kann – und wie Humor selbst in dunklen Zeiten Widerstand bedeutet.\n\n Special für Studis: Am 08.10. könnt ihr die Vorstellung zum Last Minute Preis von nur 8 € besuchen.",
    },
    {
      link: "https://wilkinsonsword.de",
      image: "wilkinson_o.jpg",
      label: "Wilkinson Sword Germany",
      text: "Wilkinson ist der weltweite Experte für Rasierer, Rasierklingen & Rasurprodukte. Perfekt rasiert – immer und überall – mit Wilkinson Sword.",
    },
  ];

  return (
    <div>
      <ErstiInfo />
      <Countdown />

      <Header id="programm">
        Unser <span className="fsr-gradient">Programm</span> für euch
      </Header>

      <WeekGrid events={events} startDate={new Date("2025-10-06")} />

      {/* <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {days.map((e, index) => (
          <DayCard key={index} day={e} />
        ))}
      </div> */}

      <SponsorGrid items={sponsors} />

      <SponsorOfferGrid items={offers} />
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

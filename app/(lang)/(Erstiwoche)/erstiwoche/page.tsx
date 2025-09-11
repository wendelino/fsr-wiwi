import { getEvents } from "@/app/_actions/event";
import Countdown from "@/components/CountDown";
import DayCard, { DayProps } from "@/components/Day";
import SponsorGrid, { SponsorOfferGrid } from "@/components/SponsorGrid";
import { Header } from "@/components/TextComponents";
import ErstiInfo from "./info";

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
      src: "wilkinson.svg",
      href: "https://wilkinsonsword.de",
      label: "Wilkinson Sword",
    },
    { src: "freitag.jpg", href: "https://freitag.ch/de_DE", label: "Freitag" },
    {src: "carla.png", href: "https://carlundcarla.de", label: "CarlundCarla.de"},
    {src:"partyfly.svg", href: "https://partyfly.de", label: "Partyfly"},
    {src:"wgheld.png", href: "https://wgheld.de", label: "WG-Held"},
  ];

  const offers = [
    {
      link: "https://freitag.ch/mission/community/smart-brains",
      image: "freitag-deal.jpg",
      label: "Freitag Deal",
      text: "SMART BAGS FOR SMART BRAINS: Studierende, Lernende und Schüler*innen sparen bis zum 15. Oktober 25% auf vier ausgewählte FREITAG Taschen. Jetzt zugreifen und nachhaltig in deine Zukunft investieren!",
    },
    {
      link: "https://wilkinsonsword.de",
      image: "wilkinson_o.jpg",
      label: "Wilkinson Sword Germany",
      text: "Wilkinson ist der weltweite Experte für Rasierer, Rasierklingen & Rasurprodukte. Perfekt rasiert – immer und überall – mit Wilkinson Sword."    },
  ];

  return (
    <div>
      <ErstiInfo />
      <Countdown />

      <Header id="programm">
        Unser <span className="fsr-gradient">Programm</span> für euch
      </Header>

      {/* <WeekGrid events={events} startDate={new Date("2025-10-06")} /> */}

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {days.map((e, index) => (
          <DayCard key={index} day={e} />
        ))}
      </div>

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

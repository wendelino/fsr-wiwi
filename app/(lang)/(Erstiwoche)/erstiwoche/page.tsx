import { getEvents } from "@/app/_actions/event";
import Countdown from "@/components/CountDown";
import { DayProps } from "@/components/Day";
import SponsorGrid, { SponsorOfferGrid } from "@/components/SponsorGrid";
import { Header } from "@/components/TextComponents";
import WeekGrid from "@/components/weekgrid/weekgrid";
import ErstiInfo from "./info";
import { Metadata } from "next";
import SaveCalendarButton from "@/components/weekgrid/save-calendar-button"; 

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
  const { events } = await getEvents({ tag: "ersti26", limit: 100 }); 
  const sponsors = [
    {
      src: "myhealth-juicery.png",
      href: "https://myhealth-juicery.de",
      label: "MyHealth Juicery",
    },
    {
      src: "ostkarte.png",
      href: "https://ostkarte.com",
      label: "Ostkarte",
    },
    {
      src: "zetti.png",
      href: "https://www.zetti.de",
      label: "Zetti",
    },
    {
      src: "goenrgy.png",
      href: "https://goenrgy.de",
      label: "Goenrgy",
    },
    {
      src: "iwh-halle.png",
      href: "https://www.iwh-halle.de",
      label: "IWH Halle",
    },
    {
      src: "lioko-mexikaner.png",
      href: "http://www.lioko-mexikaner.de/shop",
      label: "Lioko Mexikaner",
    },
    {
      src: "kathi.png",
      href: "https://www.kathi.de",
      label: "Kathi",
    },
    {
      src: "partyfly.png",
      href: "https://www.partyfly.de",
      label: "Partyfly",
    },
    {
      src: "dak.png",
      href: "https://www.dak.de",
      label: "DAK",
    },
    {
      src: "campus-tuete.png",
      href: "https://www.campus-tuete.de",
      label: "Campus-Tüte",
    },
    {
      src: "sachsen-anhalt-kanns-halt.jpg",
      href: "https://sachsen-anhalt-kanns-halt.de",
      label: "Sachsen-Anhalt kanns halt",
    },
    {
      src: "nowherenearold.png",
      href: "https://www.instagram.com/nowherenearold/",
      label: "Nowhere Near Old",
    },
    {
      src: "sparda.jpg",
      href: "https://www.sparda-b.de/homepage.html",
      label: "Sparda-Bank Berlin",
    },
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

      <div className="flex flex-col md:flex-row justify-between flex-wrap items-center gap-4">
        <Header id="programm">
          Unser <span className="fsr-gradient">Programm</span> für euch
        </Header>

        <SaveCalendarButton events={events} />
      </div>

      <WeekGrid events={events} startDate={new Date("2026-10-05")} />

      <SponsorGrid items={sponsors} />

{/*   

      <SponsorGrid items={sponsors} />

      <SponsorOfferGrid items={offers} /> */}
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

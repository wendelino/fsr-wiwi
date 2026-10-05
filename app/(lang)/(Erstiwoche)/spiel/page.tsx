import { Stagger, StaggerItem } from "@/components/motion";
import { HeroLead, PageHero } from "@/components/page-hero";
import { Prose } from "@/components/prose";
import { SectionHeading } from "@/components/section-heading";
import { Award, Medal, Trophy } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gewinnspiel",
  description:
    "Nimm am Gewinnspiel der Ersti-Woche teil: Stempel sammeln, Lose sichern und tolle Preise gewinnen.",
  openGraph: {
    title: "Gewinnspiel",
    description:
      "So funktioniert das Gewinnspiel der Ersti-Woche: Stempelkarte, Abgabe & Gewinne.",
  },
  twitter: {
    title: "Gewinnspiel",
    description:
      "Stempel sammeln, Lose sichern und mit etwas Glück Preise gewinnen.",
  },
};

const prizes = [
  { icon: Trophy, place: "Platz 1", prize: "Freitag-Rucksack" },
  { icon: Medal, place: "Platz 2", prize: "Freitag-Bauchtasche" },
  {
    icon: Award,
    place: "Platz 3",
    prize: "Junge Bühnen Card + weitere kleine Überraschungen",
  },
];

export default function Page() {
  return <div></div>;
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <PageHero
        eyebrow="Ersti-Woche"
        title={
          <>
            Gewinn
            <span className="text-transparent [-webkit-text-stroke:2px_white]">
              spiel
            </span>
          </>
        }
        poster
      >
        <HeroLead>
          Sammle Stempel im Laufe der Woche und sichere dir damit Lose für die
          Auslosung.
        </HeroLead>
      </PageHero>

      <Prose>
        <p>
          Willkommen zur Ersti-Woche! Damit es noch spannender wird, gibt es
          dieses Jahr ein Gewinnspiel für euch. Jede*r von euch hat eine
          Stempelkarte bekommen. Im Laufe der Woche könnt ihr durch die
          Teilnahme an Programmpunkten oder durch kleine Challenges Stempel
          sammeln. Jeder Stempel zählt wie ein Los im Lostopf: Wer also einen
          Stempel hat, nimmt mit einem Los teil, wer fünf Stempel hat, mit fünf
          Losen – und so weiter.
        </p>
        <p>
          Wichtig: Jede Stempelposition hat eine eigene Aufgabe – ihr könnt mit
          einer Aktivität also nicht mehrere Stempel auf einmal bekommen. Die
          Challenges sind ganz unterschiedlich. Mal gibt es Stempel schon für
          die einfache Teilnahme an einem Programmpunkt, mal müsst ihr dafür
          etwas Bestimmtes machen. Seid einfach aufmerksam dabei und lasst euch
          überraschen.
        </p>
        <h2>So funktioniert’s</h2>
        <ul>
          <li>
            Stempel sammeln, indem ihr an Programmpunkten teilnehmt oder kleine
            Challenges absolviert.
          </li>
          <li>
            Jeder Stempel = ein Los im Lostopf. Mehr Stempel = höhere
            Gewinnchancen.
          </li>
          <li>
            Eine Aktivität zählt immer nur für eine Stempelposition (keine
            Mehrfachstempel auf einmal).
          </li>
          <li>
            Zusatz-Aktion jederzeit: Folgt uns auf Instagram, schreibt einen
            Kommentar und markiert uns in eurer Story – dafür gibt’s einen
            Stempel.
          </li>
          <li>
            Eure Stempel bekommt ihr immer bei der Gewinnspiel- bzw.
            Stempelperson während der Woche.
          </li>
        </ul>
        <h2>Abgabe der Stempelkarte</h2>
        <p>
          Am Ende der Woche müsst ihr eure Stempelkarte abgeben: Entweder direkt
          am Freitag nach der Stadtralley oder am Montag, den 13. Oktober, von
          16-18 Uhr im FSR-Büro, Große Steinstraße 73 (Räume R019/R020).
        </p>
        <p>
          In der ersten FSR-Sitzung nach der Ersti-Woche findet die Auslosung
          statt. Danach werden die Gewinner*innen von uns benachrichtigt.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Zu gewinnen" title="Gewinne" />
        <Stagger as="ul" className="mt-8 grid gap-3 sm:grid-cols-3">
          {prizes.map((p) => (
            <StaggerItem
              as="li"
              variant="scale"
              key={p.place}
              className="flex items-center gap-4 rounded-3xl border bg-card p-5"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-fsr/10 text-fsr">
                <p.icon className="size-5" />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-widest text-fsr">
                  {p.place}
                </span>
                <span className="block font-bold leading-tight">{p.prize}</span>
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <Prose className="text-base">
        <h2>Datenschutzhinweis zum Gewinnspiel</h2>
        <p>
          Verantwortlich für die Datenverarbeitung im Rahmen des Gewinnspiels
          ist der Fachschaftsrat des Wirtschaftswissenschaftlichen Bereichs der
          juristischen und wirtschaftswissenschaftlichen Fakultät der
          Martin-Luther-Universität Halle-Wittenberg (FSR WiWi). Wir verarbeiten
          die von Ihnen angegebenen personenbezogenen Daten ausschließlich zum
          Zweck der Durchführung des Gewinnspiels, insbesondere zur Ermittlung
          und Benachrichtigung der Gewinner*innen sowie zur Übergabe der
          Gewinne.
        </p>
        <p>
          Erfasst und gespeichert werden ausschließlich die für die Durchführung
          des Gewinnspiels erforderlichen Daten (z. B. Name, Kontaktdaten). Die
          Daten werden nur so lange gespeichert, wie es für die Durchführung des
          Gewinnspiels notwendig ist. Nach erfolgreicher Kontaktaufnahme mit den
          Gewinner*innen und Übergabe der Gewinne werden sämtliche Daten
          unverzüglich und unwiderruflich gelöscht.
        </p>
        <p>
          Eine Weitergabe der Daten an Dritte findet nicht statt. Zugriff haben
          ausschließlich die mit der Organisation des Gewinnspiels betrauten
          Personen. Bei Fragen zur Datenverarbeitung oder zur Geltendmachung
          Ihrer Rechte können Sie sich jederzeit an den Fachschaftsrat
          Wirtschaftswissenschaften wenden:{" "}
          <a href="mailto:fachschaftsrat@wiwi.uni-halle.de">
            fachschaftsrat@wiwi.uni-halle.de
          </a>
        </p>
      </Prose>
    </div>
  );
}

import { PageHeader } from "@/components/Framer/PageHeader";
import { Header, SubHeader } from "@/components/TextComponents";
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

export default function Page() {
  return (
    <div className="space-y-8">
      <img
        src="/orange-bg.svg"
        className="fixed z-[-1] inset-0 h-full w-full object-cover opacity-60"
      />
      <PageHeader
        title="Gewinnspiel - Ersti-Woche"
        subtitle="Sammle Stempel im Laufe der Woche und sichere dir damit Lose für die Auslosung."
        disableMuted
      />

      <section className="space-y-4">
        <p className="">
          Willkommen zur Ersti-Woche! Damit es noch spannender wird, gibt es
          dieses Jahr ein Gewinnspiel für euch. Jede*r von euch hat eine
          Stempelkarte bekommen. Im Laufe der Woche könnt ihr durch die
          Teilnahme an Programmpunkten oder durch kleine Challenges Stempel
          sammeln. Jeder Stempel zählt wie ein Los im Lostopf: Wer also einen
          Stempel hat, nimmt mit einem Los teil, wer fünf Stempel hat, mit fünf
          Losen – und so weiter.
        </p>

        <p className="">
          Wichtig: Jede Stempelposition hat eine eigene Aufgabe – ihr könnt mit
          einer Aktivität also nicht mehrere Stempel auf einmal bekommen. Die
          Challenges sind ganz unterschiedlich. Mal gibt es Stempel schon für
          die einfache Teilnahme an einem Programmpunkt, mal müsst ihr dafür
          etwas Bestimmtes machen. Seid einfach aufmerksam dabei und lasst euch
          überraschen.
        </p>
      </section>

      <section className="space-y-4">
        <Header>So funktioniert’s</Header>
        <ul className="list-disc pl-6 space-y-2 ">
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
      </section>

      <section className="space-y-2">
        <SubHeader>Abgabe der Stempelkarte</SubHeader>
        <p className="">
          Am Ende der Woche müsst ihr eure Stempelkarte abgeben: Entweder direkt
          am Freitag nach der Stadtralley oder am Montag, den 13. Oktober, von
          16-18 Uhr im FSR-Büro, Große Steinstraße 73 (Räume R019/R020).
        </p>
        <p className="">
          In der ersten FSR-Sitzung nach der Ersti-Woche findet die Auslosung
          statt. Danach werden die Gewinner*innen von uns benachrichtigt.
        </p>
      </section>

      <section className="space-y-2">
        <SubHeader>Gewinne</SubHeader>
        <ul className="grid lg:grid-cols-3 gap-4 mt-4">
          <li className="flex items-center gap-4 rounded-lg border p-4 transition-colors bg-background/60 backdrop-blur-md hover:bg-muted/70">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              🏆
            </div>
            <div>
              <p className="font-semibold">Platz 1</p>
              <p className="text-muted-foreground">Freitag-Rucksack</p>
            </div>
          </li>
          <li className="flex items-center gap-4 rounded-lg border p-4 transition-colors bg-background/60 backdrop-blur-md hover:bg-muted/70">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              🥈
            </div>
            <div>
              <p className="font-semibold">Platz 2</p>
              <p className="text-muted-foreground">Freitag-Bauchtasche</p>
            </div>
          </li>
          <li className="flex items-center gap-4 rounded-lg border p-4 transition-colors bg-background/60 backdrop-blur-md hover:bg-muted/70">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              🥉
            </div>
            <div>
              <p className="font-semibold">Platz 3</p>
              <p className="text-muted-foreground">Junge Bühnen Card + weitere kleine Überraschungen</p>
            </div>
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <Header>Datenschutzhinweis zum Gewinnspiel</Header>
        <p className="">
          Verantwortlich für die Datenverarbeitung im Rahmen des Gewinnspiels
          ist der Fachschaftsrat des Wirtschaftswissenschaftlichen Bereichs der
          juristischen und wirtschaftswissenschaftlichen Fakultät der
          Martin-Luther-Universität Halle-Wittenberg (FSR WiWi). Wir verarbeiten
          die von Ihnen angegebenen personenbezogenen Daten ausschließlich zum
          Zweck der Durchführung des Gewinnspiels, insbesondere zur Ermittlung
          und Benachrichtigung der Gewinner*innen sowie zur Übergabe der
          Gewinne.
        </p>
        <p className="">
          Erfasst und gespeichert werden ausschließlich die für die Durchführung
          des Gewinnspiels erforderlichen Daten (z. B. Name, Kontaktdaten). Die
          Daten werden nur so lange gespeichert, wie es für die Durchführung des
          Gewinnspiels notwendig ist. Nach erfolgreicher Kontaktaufnahme mit den
          Gewinner*innen und Übergabe der Gewinne werden sämtliche Daten
          unverzüglich und unwiderruflich gelöscht.
        </p>
        <p className="">
          Eine Weitergabe der Daten an Dritte findet nicht statt. Zugriff haben
          ausschließlich die mit der Organisation des Gewinnspiels betrauten
          Personen. Bei Fragen zur Datenverarbeitung oder zur Geltendmachung
          Ihrer Rechte können Sie sich jederzeit an den Fachschaftsrat
          Wirtschaftswissenschaften wenden:{" "}
          <a
            className="underline"
            href="mailto:fachschaftsrat@wiwi.uni-halle.de"
          >
            fachschaftsrat@wiwi.uni-halle.de
          </a>
        </p>
      </section>
    </div>
  );
}

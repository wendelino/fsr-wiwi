import { Header, SubHeader } from "@/components/TextComponents";

export default function ErstiInfo() {
  return (
    <section className="space-y-6">
      <Header>
        Willkommen zur <span className="fsr-gradient">Ersti‑Woche</span>!
      </Header>

      <p className="text-muted-foreground">
        Die Ersti‑Woche wird vom Fachschaftsrat Wirtschaftswissenschaften (FSR) organisiert.
        Unser Ziel: Euch den Studienstart erleichtern, neue Leute zusammenbringen und euch
        gleichzeitig unsere Uni und die Stadt Halle näherbringen.
      </p>

      <SubHeader>Was euch erwartet</SubHeader>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
        <li>Sportliche Angebote, um gemeinsam aktiv zu werden</li>
        <li>Stadt- und Campustouren zum Kennenlernen eurer neuen Umgebung</li>
        <li>Workshops und Infoangebote rund ums Studieren</li>
        <li>Kneipenabende und Partys zum Feiern und Vernetzen</li>
        <li>Chillige Treffpunkte zum entspannten Ankommen</li>
      </ul>

      <SubHeader>Gewinnspiel</SubHeader>
      <p className="text-muted-foreground">
        Zusätzlich gibt es ein Gewinnspiel während der Ersti‑Woche! Nehmt an unseren
        Veranstaltungen teil und behaltet unsere Kanäle im Blick – mit etwas Glück
        gewinnt ihr coole Preise.
      </p>

      <p className="text-muted-foreground">
        Alle Termine und Details findet ihr direkt hier auf der Seite im Programm.
        Kommt vorbei – wir freuen uns auf euch!
      </p>
    </section>
  );
}



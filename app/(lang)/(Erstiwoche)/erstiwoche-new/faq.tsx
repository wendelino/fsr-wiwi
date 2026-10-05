import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ERSTI_GUIDE } from "@/lib/ersti";
import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";

const ALTKLAUSUREN_URL =
  "https://studip.uni-halle.de/dispatch.php/course/overview?cid=ee8c88937076ac5fe253303faf816cbe";

/** "Häufige Fragen" aus Entwurf 3. */
export function FaqSection() {
  return (
    <section className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
      <div>
        <h2 className="text-4xl font-black tracking-tight md:text-5xl">Häufige Fragen</h2>
        <p className="mt-3 text-muted-foreground">
          Noch etwas offen?{" "}
          <Link href="/kontakt" className="font-medium text-fsr underline underline-offset-4">
            Schreib uns
          </Link>
          .
        </p>
      </div>
      <Faq />
    </section>
  );
}

function Faq() {
  const { mail, strasse, plz, ort } = siteConfig.company;
  const items = [
    {
      q: "Muss ich mich für alles anmelden?",
      a: (
        <>
          Nein. Nur Termine mit dem Hinweis „Anmeldung nötig“ haben begrenzte Plätze – dafür meldest du dich auf der{" "}
          <Link href="/anmeldung" className="underline">Anmeldeseite</Link> an. Alle anderen Programmpunkte sind offen:
          einfach vorbeikommen.
        </>
      ),
    },
    {
      q: "Wo finde ich alle Infos zum Studienstart?",
      a: (
        <>
          Im{" "}
          <a href={ERSTI_GUIDE} target="_blank" rel="noopener noreferrer" className="underline">Ersti-Guide (PDF)</a>{" "}
          haben wir das Wichtigste für euren Start zusammengefasst.
        </>
      ),
    },
    {
      q: "Wie bekomme ich die Termine in meinen Kalender?",
      a: "Über „Alle Termine in den Kalender“ lädst du eine .ics-Datei mit dem ganzen Programm herunter. Einzelne Termine speicherst du im Detailfenster eines Termins.",
    },
    {
      q: "Wo finde ich Altklausuren?",
      a: (
        <>
          Auf StudIP unter{" "}
          <a href={ALTKLAUSUREN_URL} target="_blank" rel="noopener noreferrer" className="underline">
            Fachschaftsrat Wirtschaftswissenschaften (FSR WiWi) / Econ Students Council
          </a>
          .
        </>
      ),
    },
    {
      q: "Wer organisiert die Ersti-Woche – und kann ich mitmachen?",
      a: "Der Fachschaftsrat Wirtschaftswissenschaften, die gewählte Vertretung der WiWi-Studierenden. Unsere Sitzungen sind öffentlich: jeden zweiten Dienstag um 19 Uhr in der Großen Steinstraße 73, Raum 201.",
    },
    {
      q: "Wie erreiche ich euch?",
      a: (
        <>
          Über das <Link href="/kontakt" className="underline">Kontaktformular</Link>, per Mail an{" "}
          <a href={`mailto:${mail}`} className="underline">{mail}</a> oder vor Ort: {strasse}, {plz} {ort}.
        </>
      ),
    },
  ];
  return (
    <Accordion type="single" collapsible className="rounded-3xl border bg-card px-6">
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`q${i}`} className={i === items.length - 1 ? "border-b-0" : undefined}>
          <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

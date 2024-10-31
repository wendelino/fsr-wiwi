import { Header, SubHeader } from "@/components/TextComponents";
import { Button } from "@/components/ui/button";
import { PaperclipIcon } from "lucide-react";
import Navigate from "./Navigate";
import Link from "next/link";
import { getTranslation, TranslationProps } from "@/locales/getTranslation";
export default async function page({ params }: { params: { lang: string } }) {

  const {awareness: t} = await getTranslation(params.lang)

  return (
    <>
      <div className="relative flex flex-col gap-16 h-100 items-center justify-center py-8 mb-8">
        <img src="/logo.png" className="absolute max-h-full mt-8 opacity-10 " />
        <Header>{t.title}</Header>
        <SubHeader className="text-center">{t.subheader}</SubHeader>
        <SubHeader>{t.version}</SubHeader>
      </div>
      <a href="/files/awareness_fsr_wiwi.pdf" download>
        <Button>
          <PaperclipIcon className="pr-2" /> Als PDF herunterladen
        </Button>
      </a>
      <Navigate />
      <section id="awareness" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Was ist Awareness?</h2>
        <p>
          „To be aware“ bedeutet „sich etwas bewusst sein“. Dies bildet den
          Ausgangspunkt für die Awareness-Arbeit. Sie möchte für diverse
          Diskriminierungsformen und Gewalt (physisch oder psychisch)
          sensibilisieren und diesen dadurch vorbeugen.
          <br />
          <br />
          Ziel ist es, einen s.g. „Safer Space“ zu schaffen, wo sich alle
          Beteiligten wohl, sicher und gesehen fühlen können. Es ist ein sowohl
          individueller als auch kollektiver Lernprozess, der intern und bei
          allen Veranstaltungen unseres FSRs dazu gehört. Dieses Konzept richtet
          sich an alle unsere Mitglieder und Teilnehmer*innen unserer
          Veranstaltungen sowie die Arbeit innerhalb unseres FSRs.
        </p>
      </section>
      <section id="begriffsklaerung" className="mb-8 flex flex-col">
        <h2 className="text-2xl font-bold mb-4  ">Begriffsklärung</h2>
        <Link
          href="https://awareness-akademie.de/glossar/"
          className="underline"
        >
          https://awareness-akademie.de/glossar/
        </Link>
        <Link
          href="https://kultur-kreativpiloten.de/wp-content/uploads/Awareness-Glossar.pdf"
          className="underline"
        >
          https://kultur-kreativpiloten.de/wp-content/uploads/Awareness-Glossar.pdf
        </Link>
      </section>
      <section id="selbstverstaendnis" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Selbstverständnis</h2>
        <p>
          Der FSR bildet die demokratisch legitimierte Vertretung der
          wirtschaftswissenschaftlichen Studierendenschaft der Universität
          Halle.
          <br />
          <br />
          Wir wollen die Werte Respekt, Offenheit und Inklusivität
          repräsentieren und unser Handeln danach richten. Anhand dieser Werte
          verpflichten wir uns, daran zu arbeiten einen Safer Space zu schaffen
          und zur stetigen Sensibilisierung unserer Studierenden beizutragen.
          Des Weiteren bedürfen dieses Konzept und seine Umsetzung einer
          regelmäßigen Selbstkontrolle.
          <br /> Außerdem sind auch wir dazu angehalten, unseren Wissensstand
          und unsere Grenzen regelmäßig zu prüfen und ggf. neu zu definieren.
          <br />
          <br />
          Wir sind uns bewusst, dass es dem FSR an Diversität fehlt, bzw.
          diverse Perspektiven nicht vertreten sind. Es gilt, diese so gut es
          geht sichtbar zu machen.
        </p>
      </section>
      <section id="code-of-conduct" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Code of Conduct</h2>
        <p>
          Das Konzept richtet sich an jede*n Teilnehmer*in unserer Events und
          freie und gewählte Mitglieder des FSRs.
          <br />
          <br />
          Das Konzept findet auf allen Veranstaltungen, sowie wenn Themen und
          Aufgaben des FSRs besprochen werden, Anwendung.
          <br />
          <br />
          Was erwarten wir von den Veranstaltungen und der Arbeit im FSR?
          <br />- Jede Veranstaltung und die Arbeit im FSR soll ein schönes
          Erlebnis für uns alle werden, das durch positive Erfahrungen und
          Begegnungen in Erinnerung bleibt.
          <br />- Wir wollen einen Safer Space für alle schaffen, wo sich jede*r
          gesehen, gehört, respektiert und sicher fühlt.
          <br />- Sorgen und Probleme sollen offen angesprochen werden können.
          <br />- In den FSR-Sitzungen wünschen wir uns eine wertschätzende,
          inklusive und respektvolle Kommunikation, welche mitunter durch die
          Redner*innenliste und das Erst-Redner*innen-Recht sichergestellt
          werden soll.
          <br />- Die Sitzungsleitung ist dazu angehalten, neben Moderation und
          Führung der Redner*innenliste, das Wohlbefinden der Anwesenden zu
          überblicken und gegebenenfalls den Gang der Sitzung daran anzupassen.
          <br />- Awareness-Strukturen sind auf allen Veranstaltungen
          verpflichtend. Die Struktur hängt von der Art der Veranstaltung ab.
          <br />- Dazu gehört auch die kollektive Verantwortungsübernahme, was
          bedeutet, dass jede*r ein aktiver Teil des Awareness-Konzepts ist. Wie
          bin ich ein aktiver Teil des Awareness-Konzepts?
          <br />- Ich achte auf meine Mitmenschen und biete Unterstützung an,
          wenn eine Person Hilfe braucht und ich es mir zutraue.
          <br />- Ich respektiere andere Menschen und ihre persönlichen Grenzen.
          <br />- Ich verstehe, dass es bei meinen Handlungen nicht auf die
          Intention, sondern auf die Wirkung / Auffassung des Gegenübers
          ankommt.
          <br />- Ich handle inkludierend, jede*r gehört dazu und soll sich
          willkommen fühlen.
          <br />- Ich handle im Konsens. Nur Ja heißt Ja – im Zweifel erfrage
          ich, ob mein Gegenüber sich mit der Interaktion wohl fühlt.
          <br />- Ich handle nicht rassistisch, sexistisch, antisemitisch,
          altersdiskriminierend, queerfeindlich, ableistisch, klassen- oder
          religionsdiskriminierend.
        </p>
      </section>
      <section id="betroffene-person" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Was kann ich als betroffene Person tun?
        </h2>
        <p>
          Du erfährst psychische/physische Gewalt und/oder Diskriminierung?
          <br />
          <br />
          Du kannst jeder Zeit auf das Awareness-Team zukommen. Dein Anliegen
          wird vertraulich und parteilich behandelt. Je nach Wunsch, kann es
          dich an einen ruhigeren Ort bringen, ein Gespräch anbieten oder dich
          an andere Anlaufstellen weiterleiten.
          <br />
          <br />
          Falls du keine Awareness-Person finden kannst, steht dir auch das
          Personal des Veranstaltungsortes oder FSR-Mitglieder zur Seite. Sie
          wissen, wo die Awareness ist und bringen dich zu ihr.
          <br />
          <br />
          Wenn du erst nach einer Veranstaltung deine Erfahrung schildern
          möchtest und Unterstützung brauchst, sind wir auch dann per Instagram
          oder Mail erreichbar. Über einen Link findest du außerdem ein
          Dokument, wo du anonym dein Anliegen mitteilen kannst.
        </p>
      </section>
      <section id="unterstuetzen" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Wie kann ich betroffene Personen unterstützen?
        </h2>
        <p>
          Generell gilt:
          <br />- Bitte nimm alle Belange, die dir anvertraut werden,
          bedingungslos ernst (urteile also nicht über die involvierten
          Personen).
          <br />- Wenn Personen sich dir anvertrauen, höre aktiv zu und frage,
          was die Person gerade braucht (wichtig: keine Suggestiv-Fragen stellen
          und nicht auffordern, Erlebtes nochmal zu schildern!).
          <br />- Das Awareness-Team ist für die Lösung der Probleme zuständig.
          <br />
          <br />
          Dir fällt auf, dass es einer Person in deiner Nähe nicht gut geht oder
          eine Person übergriffig und/oder diskriminierend handelt?
          <br />
          <br />
          Wenn du es dir zutraust, kannst du die betroffene Person fragen, ob
          alles in Ordnung ist und ob sie Unterstützung benötigt. Dies ist
          wichtig, da es möglich ist, dass man selbst eine beobachtete Situation
          anders bewertet als die vermeintliche betroffene Person.
          <br />
          <br />
          1) Wenn diese also sagt, dass alles in Ordnung sei und sie keine
          Unterstützung möchte, hält man sich daran, denn es gilt die
          Definitionsmacht.
          <br />
          2) Nimmt die Person dein Angebot an, dann frage, was sie braucht und
          informiere das Awareness-Team, damit es übernehmen kann. Geschultes
          Awareness-Personal weiß, wie mit bestimmten Situationen umzugehen ist.
          <br />
          Wenn du eine vermeintlich übergriffige oder gewalttätige Situation
          beobachtest, du aber nicht damit in Kontakt kommen möchtest/kannst,
          informiere direkt das Awareness-Team, damit es übernehmen kann.
          <br />
          Auch nach einem Event stehen wir zur Verfügung. Du kannst uns über
          Instagram oder Mail benachrichtigen oder dem Link zur anonymen
          Awareness-Fall-Meldung folgen.
        </p>
      </section>
      <section id="self-awareness" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Self-Awareness</h2>
        <p>
          Nur wer auf sich selbst achtet, kann gut auf andere achten. Überlege
          also, ob du dich als geeignete Person für die Situation fühlst.
          Belastet dich die Situation, bist du verunsichert oder ist es schwer,
          Hilfe zu leisten? Dann suche dir Unterstützung oder gib an eine andere
          Person ab. Du musst nichts tun, was dir unangenehm ist oder dem du
          dich nicht gewachsen fühlst. Auch du kannst das Awareness Team
          brauchen. Melde dich gerne bei ihnen.
        </p>
      </section>
    </>
  );
}

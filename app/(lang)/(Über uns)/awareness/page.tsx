import { HeroLead, PageHero } from "@/components/page-hero";
import { Eyebrow, SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/siteConfig";
import { getTranslation } from "@/locales/getTranslation";
import { ArrowUpRight, FileDown, Instagram, Mail } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Awareness",
  description:
    "Awareness-Konzept des Fachschaftsrats Wirtschaftswissenschaften der MLU Halle-Wittenberg",
};

const sections = [
  { id: "awareness", label: "Was ist Awareness?" },
  { id: "begriffsklaerung", label: "Begriffsklärung" },
  { id: "selbstverstaendnis", label: "Selbstverständnis" },
  { id: "code-of-conduct", label: "Code of Conduct" },
  { id: "betroffene-person", label: "Was kann ich als betroffene Person tun?" },
  { id: "unterstuetzen", label: "Wie kann ich betroffene Personen unterstützen?" },
  { id: "self-awareness", label: "Self-Awareness" },
];

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"];

const INSTAGRAM_URL = "https://www.instagram.com/fsr.wiwi.halle/";

const list = "list-disc space-y-2 pl-5 marker:text-fsr";

export default async function page() {
  const { awareness: t } = await getTranslation("de");
  const { mail } = siteConfig.company;

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <PageHero eyebrow="Über uns · Konzept" title={t.title} poster>
        <HeroLead>{t.subheader}</HeroLead>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="bg-white text-fsr-deep hover:bg-white/90">
            <a href="/files/awareness_fsr_wiwi.pdf" download>
              <FileDown className="mr-2 size-4" /> Als PDF herunterladen
            </a>
          </Button>
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/25">
            {t.version}
          </span>
        </div>
      </PageHero>

      <div className="grid gap-10 md:grid-cols-[1fr_20rem] md:gap-12">
        <aside className="space-y-4 md:sticky md:top-24 md:order-last md:self-start">
          <nav aria-label="Inhalt" className="rounded-3xl border bg-card p-6">
            <Eyebrow className="text-xs">Inhalt</Eyebrow>
            <ol className="mt-3 space-y-1">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex gap-3 rounded-xl px-2 py-1.5 text-sm transition hover:bg-fsr/5 hover:text-fsr focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr"
                  >
                    <span className="w-6 shrink-0 font-bold text-fsr">{ROMAN[i]}.</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="rounded-3xl bg-fsr/10 p-6">
            <p className="font-bold">Du brauchst Unterstützung?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Auch nach einer Veranstaltung sind wir per Instagram oder Mail erreichbar.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Button asChild className="bg-fsr-deep text-white hover:bg-fsr-deep/90">
                <a href={`mailto:${mail}`}>
                  <Mail className="mr-2 size-4" /> Mail schreiben
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2 size-4" /> Instagram
                </a>
              </Button>
            </div>
          </div>
        </aside>

        <article className="min-w-0 space-y-16 text-lg leading-relaxed text-foreground/80">
          <Section index={0}>
            <p>
              „To be aware“ bedeutet „sich etwas bewusst sein“. Dies bildet den Ausgangspunkt
              für die Awareness-Arbeit. Sie möchte für diverse Diskriminierungsformen und
              Gewalt (physisch oder psychisch) sensibilisieren und diesen dadurch vorbeugen.
            </p>
            <p>
              Ziel ist es, einen s.g. „Safer Space“ zu schaffen, wo sich alle Beteiligten wohl,
              sicher und gesehen fühlen können. Es ist ein sowohl individueller als auch
              kollektiver Lernprozess, der intern und bei allen Veranstaltungen unseres FSRs dazu
              gehört. Dieses Konzept richtet sich an alle unsere Mitglieder und
              Teilnehmer*innen unserer Veranstaltungen sowie die Arbeit innerhalb unseres FSRs.
            </p>
          </Section>

          <Section index={1}>
            <ul className="grid gap-3 text-base sm:grid-cols-2">
              {[
                { href: "https://awareness-akademie.de/glossar/", label: "Glossar der Awareness Akademie", host: "awareness-akademie.de" },
                {
                  href: "https://kultur-kreativpiloten.de/wp-content/uploads/Awareness-Glossar.pdf",
                  label: "Awareness-Glossar (PDF)",
                  host: "kultur-kreativpiloten.de",
                },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-3 rounded-2xl border p-4 transition hover:border-fsr/40 hover:bg-fsr/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr"
                  >
                    <span className="min-w-0">
                      <span className="block font-bold leading-tight text-foreground">{l.label}</span>
                      <span className="block text-xs text-muted-foreground">{l.host}</span>
                    </span>
                    <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground transition group-hover:text-fsr" />
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <Section index={2}>
            <p>
              Der FSR bildet die demokratisch legitimierte Vertretung der
              wirtschaftswissenschaftlichen Studierendenschaft der Universität Halle.
            </p>
            <p>
              Wir wollen die Werte Respekt, Offenheit und Inklusivität repräsentieren und unser
              Handeln danach richten. Anhand dieser Werte verpflichten wir uns, daran zu arbeiten
              einen Safer Space zu schaffen und zur stetigen Sensibilisierung unserer
              Studierenden beizutragen. Des Weiteren bedürfen dieses Konzept und seine Umsetzung
              einer regelmäßigen Selbstkontrolle. Außerdem sind auch wir dazu angehalten, unseren
              Wissensstand und unsere Grenzen regelmäßig zu prüfen und ggf. neu zu definieren.
            </p>
            <p>
              Wir sind uns bewusst, dass es dem FSR an Diversität fehlt, bzw. diverse
              Perspektiven nicht vertreten sind. Es gilt, diese so gut es geht sichtbar zu machen.
            </p>
          </Section>

          <Section index={3}>
            <p>
              Das Konzept richtet sich an jede*n Teilnehmer*in unserer Events und freie und
              gewählte Mitglieder des FSRs.
            </p>
            <p>
              Das Konzept findet auf allen Veranstaltungen, sowie wenn Themen und Aufgaben des
              FSRs besprochen werden, Anwendung.
            </p>
            <h3 className="text-xl font-bold text-foreground">
              Was erwarten wir von den Veranstaltungen und der Arbeit im FSR?
            </h3>
            <ul className={list}>
              <li>
                Jede Veranstaltung und die Arbeit im FSR soll ein schönes Erlebnis für uns alle
                werden, das durch positive Erfahrungen und Begegnungen in Erinnerung bleibt.
              </li>
              <li>
                Wir wollen einen Safer Space für alle schaffen, wo sich jede*r gesehen, gehört,
                respektiert und sicher fühlt.
              </li>
              <li>Sorgen und Probleme sollen offen angesprochen werden können.</li>
              <li>
                In den FSR-Sitzungen wünschen wir uns eine wertschätzende, inklusive und
                respektvolle Kommunikation, welche mitunter durch die Redner*innenliste und das
                Erst-Redner*innen-Recht sichergestellt werden soll.
              </li>
              <li>
                Die Sitzungsleitung ist dazu angehalten, neben Moderation und Führung der
                Redner*innenliste, das Wohlbefinden der Anwesenden zu überblicken und
                gegebenenfalls den Gang der Sitzung daran anzupassen.
              </li>
              <li>
                Awareness-Strukturen sind auf allen Veranstaltungen verpflichtend. Die Struktur
                hängt von der Art der Veranstaltung ab.
              </li>
              <li>
                Dazu gehört auch die kollektive Verantwortungsübernahme, was bedeutet, dass jede*r
                ein aktiver Teil des Awareness-Konzepts ist.
              </li>
            </ul>
            <h3 className="text-xl font-bold text-foreground">
              Wie bin ich ein aktiver Teil des Awareness-Konzepts?
            </h3>
            <ul className={list}>
              <li>
                Ich achte auf meine Mitmenschen und biete Unterstützung an, wenn eine Person Hilfe
                braucht und ich es mir zutraue.
              </li>
              <li>Ich respektiere andere Menschen und ihre persönlichen Grenzen.</li>
              <li>
                Ich verstehe, dass es bei meinen Handlungen nicht auf die Intention, sondern auf
                die Wirkung / Auffassung des Gegenübers ankommt.
              </li>
              <li>Ich handle inkludierend, jede*r gehört dazu und soll sich willkommen fühlen.</li>
              <li>
                Ich handle im Konsens. Nur Ja heißt Ja – im Zweifel erfrage ich, ob mein Gegenüber
                sich mit der Interaktion wohl fühlt.
              </li>
              <li>
                Ich handle nicht rassistisch, sexistisch, antisemitisch, altersdiskriminierend,
                queerfeindlich, ableistisch, klassen- oder religionsdiskriminierend.
              </li>
            </ul>
          </Section>

          <Section index={4} highlight>
            <p className="font-semibold text-foreground">
              Du erfährst psychische/physische Gewalt und/oder Diskriminierung?
            </p>
            <p>
              Du kannst jeder Zeit auf das Awareness-Team zukommen. Dein Anliegen wird
              vertraulich und parteilich behandelt. Je nach Wunsch, kann es dich an einen
              ruhigeren Ort bringen, ein Gespräch anbieten oder dich an andere Anlaufstellen
              weiterleiten.
            </p>
            <p>
              Falls du keine Awareness-Person finden kannst, steht dir auch das Personal des
              Veranstaltungsortes oder FSR-Mitglieder zur Seite. Sie wissen, wo die Awareness ist
              und bringen dich zu ihr.
            </p>
            <p>
              Wenn du erst nach einer Veranstaltung deine Erfahrung schildern möchtest und
              Unterstützung brauchst, sind wir auch dann per Instagram oder Mail erreichbar. Über
              einen Link findest du außerdem ein Dokument, wo du anonym dein Anliegen mitteilen
              kannst.
            </p>
          </Section>

          <Section index={5}>
            <h3 className="text-xl font-bold text-foreground">Generell gilt:</h3>
            <ul className={list}>
              <li>
                Bitte nimm alle Belange, die dir anvertraut werden, bedingungslos ernst (urteile
                also nicht über die involvierten Personen).
              </li>
              <li>
                Wenn Personen sich dir anvertrauen, höre aktiv zu und frage, was die Person gerade
                braucht (wichtig: keine Suggestiv-Fragen stellen und nicht auffordern, Erlebtes
                nochmal zu schildern!).
              </li>
              <li>Das Awareness-Team ist für die Lösung der Probleme zuständig.</li>
            </ul>
            <p className="font-semibold text-foreground">
              Dir fällt auf, dass es einer Person in deiner Nähe nicht gut geht oder eine Person
              übergriffig und/oder diskriminierend handelt?
            </p>
            <p>
              Wenn du es dir zutraust, kannst du die betroffene Person fragen, ob alles in Ordnung
              ist und ob sie Unterstützung benötigt. Dies ist wichtig, da es möglich ist, dass man
              selbst eine beobachtete Situation anders bewertet als die vermeintliche betroffene
              Person.
            </p>
            <ol className="list-decimal space-y-2 pl-5 marker:font-bold marker:text-fsr">
              <li>
                Wenn diese also sagt, dass alles in Ordnung sei und sie keine Unterstützung möchte,
                hält man sich daran, denn es gilt die Definitionsmacht.
              </li>
              <li>
                Nimmt die Person dein Angebot an, dann frage, was sie braucht und informiere das
                Awareness-Team, damit es übernehmen kann. Geschultes Awareness-Personal weiß, wie
                mit bestimmten Situationen umzugehen ist.
              </li>
            </ol>
            <p>
              Wenn du eine vermeintlich übergriffige oder gewalttätige Situation beobachtest, du
              aber nicht damit in Kontakt kommen möchtest/kannst, informiere direkt das
              Awareness-Team, damit es übernehmen kann.
            </p>
            <p>
              Auch nach einem Event stehen wir zur Verfügung. Du kannst uns über Instagram oder
              Mail benachrichtigen oder dem Link zur anonymen Awareness-Fall-Meldung folgen.
            </p>
          </Section>

          <Section index={6}>
            <p>
              Nur wer auf sich selbst achtet, kann gut auf andere achten. Überlege also, ob du dich
              als geeignete Person für die Situation fühlst. Belastet dich die Situation, bist du
              verunsichert oder ist es schwer, Hilfe zu leisten? Dann suche dir Unterstützung oder
              gib an eine andere Person ab. Du musst nichts tun, was dir unangenehm ist oder dem du
              dich nicht gewachsen fühlst. Auch du kannst das Awareness Team brauchen. Melde dich
              gerne bei ihnen.
            </p>
          </Section>
        </article>
      </div>
    </div>
  );
}

function Section({
  index,
  highlight,
  children,
}: {
  index: number;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  const { id, label } = sections[index];
  return (
    <section id={id} className="scroll-mt-24">
      <SectionHeading eyebrow={`Teil ${ROMAN[index]}`} title={label} />
      <div className={highlight ? "mt-6 space-y-4 rounded-3xl bg-fsr/10 p-6 sm:p-8" : "mt-6 space-y-4"}>
        {children}
      </div>
    </section>
  );
}

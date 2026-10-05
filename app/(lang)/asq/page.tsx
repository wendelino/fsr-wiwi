import { HeroDeco } from "@/components/hero-deco";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { HeroLead, PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/siteConfig";
import {
  ArrowDown,
  Briefcase,
  Calendar,
  Coffee,
  EuroIcon,
  GraduationCap,
  Mail,
  Users,
} from "lucide-react";
import { Metadata } from "next";

const description =
  "Entdecke neue Möglichkeiten, sammle wertvolle Erfahrungen und verdiene 5 ECTS-Punkte mit dem Allgemeinen Schlüsselqualifikationsmodul beim Fachschaftsrat Wirtschaftswissenschaften!";

export const metadata: Metadata = {
  title: "ASQ",
  description,
  openGraph: {
    title: "ASQ",
    description,
    url: "https://fsr-wiwi-halle.de/asq",
    siteName: "Fachschaftsrat Wirtschaftswissenschaften",
    images: [
      {
        url: "https://fsr-wiwi-halle.de/logo.png",
        width: 1200,
        height: 630,
        alt: "ASQ",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASQ",
    description,
    images: ["https://fsr-wiwi-halle.de/logo.png"],
  },
};

const facts = [
  {
    label: "Das Modul",
    value: "5 ECTS",
    text: "Ein ASQ beim FSR wird vom ASQ-Büro anerkannt und bringt dir volle 5 ECTS (entspricht 150 h Arbeitsaufwand).",
  },
  {
    label: "Dein Team",
    value: "5–6 Leute",
    text: "Besteht aus 5–6 Studierenden, mit denen du zusammen arbeitest und spannende Projekte umsetzt.",
  },
  {
    label: "Deine Unterstützung",
    value: "Der FSR",
    text: "Erhältst du direkt von den Mitgliedern des FSR, die dem ASQ mit Rat und Tat zur Seite stehen.",
  },
];

const tasks = [
  {
    icon: Calendar,
    text: "Plane, organisiere und setze eigene Projekte in Teamarbeit um (z. B. Praxis, Party, Podiumsdiskussion)",
  },
  { icon: EuroIcon, text: "Nutze das zur Verfügung gestellte Budget für deine Projekte" },
  { icon: Users, text: "Lerne die Arbeit der Hochschulgremien kennen" },
  {
    icon: Briefcase,
    text: "Knüpfe Kontakte zu Studierenden aus verschiedenen Jahrgängen und Arbeitsbereichen",
  },
  { icon: Coffee, text: "Genieße eine lockere Arbeitsatmosphäre" },
  {
    icon: GraduationCap,
    text: "Sammle wertvolle praktische Erfahrungen für dein Studium und zukünftige Karriere",
  },
];

const steps = [
  {
    title: "Bewerbungsfrist beachten",
    text: "Die genaue Bewerbungsfrist wird jedes Semester über Facebook, Instagram und Stud.IP ausgeschrieben.",
  },
  {
    title: "Bewerbung vorbereiten",
    text: "Erstelle ein Anschreiben mit deinen persönlichen Daten und ein kreatives Motivationsschreiben.",
  },
  {
    title: "Bewerbung einreichen",
    text: "Sende deine Bewerbung an die angegebene E-Mail-Adresse oder reiche sie persönlich beim FSR ein.",
  },
  {
    title: "Rückmeldung abwarten",
    text: "Der FSR wird sich mit dir in Verbindung setzen, um dich über den weiteren Verlauf zu informieren.",
  },
];

const faq = [
  {
    q: "Was ist der Leistungsnachweis?",
    a: (
      <>
        Der Leistungsnachweis besteht aus drei Teilen:
        <ol className="mt-2 list-decimal space-y-1 pl-5 marker:font-semibold marker:text-fsr">
          <li>Dein eigenes Semesterprojekt</li>
          <li>Unterstützung von FSR-Projekten</li>
          <li>
            Ein Bericht im Umfang von 3 bis 5 Seiten über die Art und den Umfang der
            Tätigkeit mit Lernerfolgen bzw. erworbenen Kompetenzen
          </li>
        </ol>
      </>
    ),
  },
  {
    q: "Wie viel Zeit muss ich investieren?",
    a: "Das ASQ-Modul entspricht einem Arbeitsaufwand von 150 Stunden. Dies verteilt sich über das gesamte Semester, sodass du im Durchschnitt mit etwa 10 Stunden pro Woche rechnen kannst. Die genaue Zeiteinteilung ist jedoch flexibel und kann je nach Projektphase variieren.",
  },
  {
    q: "Kann ich das ASQ-Modul auch in Teilzeit absolvieren?",
    a: "Grundsätzlich ist das ASQ-Modul als Vollzeitaktivität während eines Semesters konzipiert. In Ausnahmefällen und nach Rücksprache mit dem FSR und dem ASQ-Büro könnte eine Teilzeitvariante über zwei Semester möglich sein. Dies muss jedoch individuell geprüft und vereinbart werden.",
  },
];

export default function Page() {
  const apply = `mailto:${siteConfig.company.mail}`;
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <PageHero
        eyebrow="Schlüsselqualifikation beim FSR"
        title={
          <>
            ASQ beim <span className="text-transparent [-webkit-text-stroke:2px_white]">FSR</span>
          </>
        }
        poster
      >
        <HeroLead>{description}</HeroLead>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-white text-fsr-deep hover:bg-white/90">
            <a href={apply} data-umami-event="ASQ-Apply-Hero">
              <Mail className="mr-2 size-4" /> Jetzt bewerben
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <a href="#bewerbung">
              So bewirbst du dich <ArrowDown className="ml-2 size-4" />
            </a>
          </Button>
        </div>
      </PageHero>

      <section>
        <SectionHeading eyebrow="Auf einen Blick" title="Das Modul" />
        <Stagger as="ul" className="mt-8 grid gap-4 md:grid-cols-3">
          {facts.map((f) => (
            <StaggerItem as="li" variant="scale" key={f.label} className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-fsr">{f.label}</p>
              <p className="mt-2 text-4xl font-black uppercase leading-none tracking-tight">{f.value}</p>
              <p className="mt-4 text-sm text-muted-foreground">{f.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section>
        <SectionHeading eyebrow="Was dich erwartet" title="Deine Vorteile und Aufgaben" />
        <Stagger as="ul" step={0.05} className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <StaggerItem as="li" key={task.text} className="group flex items-start gap-4 rounded-3xl border bg-card p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-fsr/10 text-fsr transition duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transition-none">
                <task.icon className="size-5" />
              </span>
              <p className="pt-1">{task.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="bewerbung" className="scroll-mt-24">
        <SectionHeading eyebrow="In vier Schritten" title="Der Bewerbungsprozess" />
        {/* Schritte laufen von links nach rechts ein, wie ein Zeitstrahl */}
        <Stagger as="ol" step={0.12} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <StaggerItem as="li" variant="left" key={s.title} className="border-t-2 border-fsr/40 pt-5">
              <span
                aria-hidden
                className="block text-5xl font-black tabular-nums text-transparent [-webkit-text-stroke:1.5px_hsl(var(--fsr1))]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-bold leading-tight">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
        <SectionHeading eyebrow="FAQ" title="Häufig gestellte Fragen" />
        <Reveal>
          <Accordion type="single" collapsible className="rounded-3xl border bg-card px-6">
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`q${i}`} className={i === faq.length - 1 ? "border-b-0" : undefined}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      <Reveal as="section" variant="scale" className="relative overflow-hidden rounded-[2rem] bg-fsr-deep p-8 text-white sm:p-12 md:p-16">
        <HeroDeco logo={false} />
        <div className="relative max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-white/70">Mitmachen</p>
          <h2 className="mt-2 hyphens-auto text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Bereit für eine neue Heraus&shy;forderung?
          </h2>
          <p className="mt-4 text-lg text-white/85">
            Wir freuen uns auf deine Bewerbung und darauf, dich im Team begrüßen zu dürfen!
          </p>
          <Button asChild size="lg" className="mt-8 bg-white text-fsr-deep hover:bg-white/90">
            <a href={apply} data-umami-event="ASQ-Apply-CTA">
              <Mail className="mr-2 size-4" /> Jetzt bewerben
            </a>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}

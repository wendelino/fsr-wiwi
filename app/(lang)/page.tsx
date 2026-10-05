import { HomeHero } from "@/components/home-hero";
import { MeetingCard } from "@/components/meeting-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import InstagramEmbed from "@/components/InstagramEmbed";
import { PosterItem, PosterList } from "@/components/poster-list";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { isErstiSeason } from "@/lib/ersti";
import { getTranslation } from "@/locales/getTranslation";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  FileText,
  Landmark,
  MessageCircle,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";

// Der Ersti-Teaser im Hero hängt vom Datum ab
export const revalidate = 3600;

const ALTKLAUSUREN_URL =
  "https://studip.uni-halle.de/dispatch.php/course/overview?cid=ee8c88937076ac5fe253303faf816cbe";
const FUNDING_URL = "https://wcms.itz.uni-halle.de/download.php?down=56894&elem=2139305";

const fachschaft: PosterItem[] = [
  {
    icon: User,
    title: "Fachschaft",
    text: "Mit der Immatrikulation bist du automatisch Mitglied – die Fachschaft sind alle Studierenden der Wirtschaftswissenschaften.",
  },
  {
    icon: Users,
    title: "Fachschaftsrat",
    text: "Die gewählte Vertretung der Fachschaft. Wir kümmern uns um die Probleme und Belange der Studierenden.",
  },
  {
    icon: Landmark,
    title: "StuRa",
    text: "Alle Studierenden der Universität vertritt zusätzlich der Studierendenrat.",
  },
];

export default async function Home() {
  const { home: t } = await getTranslation("de");
  const season = isErstiSeason(new Date());

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <HomeHero showErstiTeaser={season} />

      {/* Schnellzugriff */}
      <section>
        <SectionHeading eyebrow="Schnellzugriff" title="Alles Wichtige" />
        <Stagger className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StaggerItem variant="scale" className="col-span-2 md:row-span-2">
            <a
              href={ALTKLAUSUREN_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="E-CTA-Altklausuren"
              className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-3xl bg-fsr-deep p-6 text-white transition hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr focus-visible:ring-offset-2 sm:p-8"
            >
              <BookOpen
                aria-hidden
                className="absolute -bottom-8 -right-8 size-48 text-white/10 transition duration-500 group-hover:-rotate-6 group-hover:scale-105 motion-reduce:transition-none"
              />
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15">
                <BookOpen className="size-6" />
              </span>
              <span className="relative">
                <span className="block text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl">
                  Altklausuren
                </span>
                <span className="mt-3 block max-w-sm text-white/85">
                  Unsere Sammlung findest du auf StudIP unter „Fachschaftsrat
                  Wirtschaftswissenschaften (FSR WiWi) / Econ Students Council“.
                </span>
                <span className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-fsr-deep">
                  Zu StudIP <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </span>
            </a>
          </StaggerItem>
          <Tile href="/kalender" icon={CalendarDays} title="Kalender" text="Alle Termine des FSR" />
          <Tile href="/kontakt" icon={MessageCircle} title="Kontakt" text="Fragen, Ideen, Probleme? Schreib uns." />
          <Tile
            className="col-span-2"
            href={FUNDING_URL}
            external
            icon={FileText}
            title={t.projectFunding.header}
            text="Ihr habt ein Projekt, das Unterstützung braucht? Hier gibt's das Merkblatt zur Antragsstellung."
          />
        </Stagger>
      </section>

      {/* Fachschaft */}
      <section className="grid gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
        <div className="md:pt-5">
          <SectionHeading eyebrow="Über uns" title={t.meaningOfFachschaft.header}>
            Wer ist eigentlich wer? Drei Begriffe, die dir im Studium immer
            wieder begegnen.
          </SectionHeading>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/about">
                Mehr über uns <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/mitglieder">Unsere Mitglieder</Link>
            </Button>
          </div>
        </div>
        <PosterList items={fachschaft} />
      </section>

      <MeetingCard title={t.meeting.header} />

      {/* Instagram */}
      <section>
        <SectionHeading eyebrow="@fsr.wiwi.halle" title={t.followUs.header} className="mb-8" />
        <Reveal>
          <InstagramEmbed />
        </Reveal>
      </section>
    </div>
  );
}

function Tile({
  href,
  external,
  icon: Icon,
  title,
  text,
  className,
}: {
  href: string;
  external?: boolean;
  icon: typeof FileText;
  title: string;
  text: string;
  className?: string;
}) {
  const content = (
    <>
      <span className="flex items-start justify-between">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-fsr/10 text-fsr">
          <Icon className="size-5" />
        </span>
        <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fsr" />
      </span>
      <span className="mt-6 block text-lg font-bold leading-tight">{title}</span>
      <span className="mt-1 block text-sm text-muted-foreground">{text}</span>
    </>
  );
  const cls =
    "group flex h-full flex-col rounded-3xl border bg-card p-5 transition hover:border-fsr/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr";
  return (
    <StaggerItem variant="scale" className={className}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {content}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {content}
        </Link>
      )}
    </StaggerItem>
  );
}

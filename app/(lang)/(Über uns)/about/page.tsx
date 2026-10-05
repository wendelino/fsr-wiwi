import { MeetingCard } from "@/components/meeting-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { HeroLead, PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { ERSTI_PAGE } from "@/lib/ersti";
import { siteConfig } from "@/lib/siteConfig";
import { getTranslation } from "@/locales/getTranslation";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen, 
  GraduationCap,
  HandCoins,
  Instagram,
  Mail,
  MapPin,
  PartyPopper,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Alle Informationen zum Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg",

  openGraph: {
    url: "https://fsr-wiwi-halle.de/about",
    type: "website",
    title: "Über uns",
    description:
      "Alle Informationen zum Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg",
    images: [
      {
        url: "https://fsr-wiwi-halle.de/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Über uns",
    description:
      "Alle Informationen zum Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg",
  },
};

const STUDIP_URL =
  "https://studip.uni-halle.de/dispatch.php/course/overview?cid=ee8c88937076ac5fe253303faf816cbe";
const FUNDING_URL = "https://wcms.itz.uni-halle.de/download.php?down=56894&elem=2139305";

// Inhalte aus unserer Infografik (public/fsr-ovdf.jpeg)
const offers = [
  {
    icon: GraduationCap,
    title: "ASQ beim FSR",
    points: [
      "In jedem Semester",
      "Gestalte dein eigenes Projekt",
      "Knüpfe Kontakte in Lehre, Forschung und Verwaltung",
      "Triff neue Leute und blicke hinter die Kulissen von Uni und Veranstaltungen",
    ],
    link: { href: "/asq", label: "Mehr zum ASQ" },
  },
  {
    icon: HandCoins,
    title: "Projektförderung",
    points: [
      "Du hast eine Idee für ein Projekt, eine Sportveranstaltung, möchtest dich politisch engagieren oder eine Party veranstalten?",
      "Wir fördern dein Projekt finanziell, unterstützen dich bei der Werbung und leihen Technik aus.",
    ],
    link: { href: FUNDING_URL, label: "Merkblatt zum Antrag", external: true },
  },
  {
    icon: PartyPopper,
    title: "Projekte & Initiativen",
    points: [
      "Absolventenfeier und Innenhofpartys",
      "Fußballturnier und Drachenbootrennen",
      "Podiumsdiskussionen, Workshops",
      "Ersti-Rallye, Glühweinhütte und vieles mehr",
    ],
    link: { href: "/kalender", label: "Zum Kalender" },
  },
];

const more = [
  { href: ERSTI_PAGE, icon: PartyPopper, title: "Ersti-Woche", text: "Euer Start ins Studium" },
  { href: STUDIP_URL, icon: BookOpen, title: "Altklausuren", text: "Unsere Sammlung auf StudIP", external: true },
  { href: "/awareness", icon: ShieldCheck, title: "Awareness", text: "Unser Konzept für einen Safer Space" },
  { href: "/mitglieder", icon: Users, title: "Mitglieder", text: "Wer gerade im FSR sitzt" },
];

export default async function page() {
  const { about: t } = await getTranslation("de");
  const { mail, strasse, plz, ort } = siteConfig.company;

  const channels = [
    { href: `mailto:${mail}`, icon: Mail, title: "E-Mail", text: mail },
    { href: "https://www.instagram.com/fsr.wiwi.halle/", icon: Instagram, title: t.cards.instagram.title, text: t.cards.instagram.content },
    // { href: "https://www.facebook.com/fsr.wiwi.halle", icon: Facebook, title: t.cards.facebook.title, text: t.cards.facebook.content },
    { href: STUDIP_URL, icon: BookOpen, title: t.cards.studip.title, text: t.cards.studip.content },
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <PageHero
        eyebrow="Über uns"
        title={
          <>
            {/* Weicher Trennstrich: bricht als "Fachschafts-rat" statt mitten im Wort */}
            Fachschafts&shy;rat{" "}
            <span className="text-transparent [-webkit-text-stroke:2px_white]">WiWi</span>
          </>
        }
        poster
      >
        <HeroLead>{t.subtitle}</HeroLead>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-white text-fsr-deep hover:bg-white/90">
            <Link href="/mitglieder">
              <Users className="mr-2 size-4" /> Unsere Mitglieder
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/kontakt">
              Kontakt <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </PageHero>

      <section className="grid gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
        <SectionHeading eyebrow="Wer wir sind" title={t.aboutSection.title} />
        <Reveal className="space-y-4 text-lg leading-relaxed text-foreground/80 md:pt-6">
          <p>{t.aboutSection.text1}</p>
          <p>{t.aboutSection.text2}</p>
        </Reveal>
      </section>

      <section>
        <SectionHeading eyebrow="Für euch" title="Was wir machen" />
        <Stagger as="ul" className="mt-8 grid gap-4 md:grid-cols-3">
          {offers.map((o) => (
            <StaggerItem as="li" variant="scale" key={o.title} className="group flex flex-col rounded-3xl border bg-card p-6 transition hover:border-fsr/40 hover:shadow-md">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-fsr/10 text-fsr transition duration-300 group-hover:-rotate-6 motion-reduce:transition-none">
                <o.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold leading-tight">{o.title}</h3>
              <ul className="mt-3 flex-1 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground marker:text-fsr">
                {o.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Link
                href={o.link.href}
                {...(o.link.external && { target: "_blank", rel: "noopener noreferrer" })}
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-fsr underline-offset-4 hover:underline"
              >
                {o.link.label}
                {o.link.external ? (
                  <ArrowUpRight className="size-4" />
                ) : (
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                )}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <Stagger as="ul" className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {more.map((l) => (
            <StaggerItem as="li" key={l.title}>
              <Link
                href={l.href}
                {...(l.external && { target: "_blank", rel: "noopener noreferrer" })}
                className="group flex h-full items-center gap-3 rounded-2xl border p-4 transition hover:border-fsr/40 hover:bg-fsr/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr"
              >
                <l.icon className="size-5 shrink-0 text-fsr" />
                <span className="min-w-0">
                  <span className="block font-bold leading-tight">{l.title}</span>
                  <span className="block text-xs text-muted-foreground">{l.text}</span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <MeetingCard />

      <section>
        <SectionHeading eyebrow={t.contactSection.title} title="So erreichst du uns" />
        <Stagger className="mt-8 grid gap-3 sm:grid-cols-1 lg:grid-cols-3">
          {channels.map((c) => (
            <StaggerItem key={c.title} variant="scale">
              <a
                href={c.href}
                {...(!c.href.startsWith("mailto:") && { target: "_blank", rel: "noopener noreferrer" })}
                className="group flex h-full flex-col rounded-3xl border bg-card p-5 transition hover:border-fsr/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr"
              >
                <span className="flex items-start justify-between">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-fsr/10 text-fsr">
                    <c.icon className="size-5" />
                  </span>
                  <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fsr" />
                </span>
                <span className="mt-6 block text-lg font-bold leading-tight">{c.title}</span>
                <span className="mt-1 block break-words text-sm text-muted-foreground">{c.text}</span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 size-4 shrink-0 text-fsr" />
          Fachschaftsrat des wirtschaftswissenschaftlichen Bereichs der Juristischen und
          Wirtschaftswissenschaftlichen Fakultät · {strasse}, {plz} {ort}
        </p>
      </section>
    </div>
  );
}

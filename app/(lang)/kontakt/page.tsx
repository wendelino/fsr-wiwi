import ContactForm from "@/components/forms/contact-form";
import IframeConsent from "@/components/iframe-consent";
import InstagramEmbed from "@/components/InstagramEmbed";
import { MeetingCard } from "@/components/meeting-card";
import { HeroLead, PageHero } from "@/components/page-hero";
import { Eyebrow, SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/siteConfig";
import { ArrowUpRight, BookOpen, FileText, Mail, MapPin } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Schreib uns eine Nachricht, wir melden uns bei dir :)",
  keywords: [
    "Fachschaftsrat",
    "FSR",
    "Wirtschaftswissenschaften",
    "Halle",
    "Halle-Wittenberg",
    "Martin Luther Universität",
    "Universität",
    "MLU",
    "Kontakt",
    "Hilfe",
    "Email",
  ],
  openGraph: {
    url: "https://fsr-wiwi-halle.de/kontakt",
    type: "website",
    title: "Kontakt",
    description:
      "Kontakt zum Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg",
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
    title: "Kontakt",
    description:
      "Kontakt zum Fachschaftsrat Wirtschaftswissenschaften der MLU Halle-Wittenberg",
  },
};

const ALTKLAUSUREN_URL =
  "https://studip.uni-halle.de/dispatch.php/course/overview?cid=ee8c88937076ac5fe253303faf816cbe";
const FUNDING_URL = "https://wcms.itz.uni-halle.de/download.php?down=56894&elem=2139305";
const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.7346769053684!2d11.967479776676894!3d51.48653291055576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a66344312e9d2d%3A0x4b22614bcb6f7c9e!2sGrosse%20Steinstrasse%2073%2C%2006108%20Halle%20(Saale)%2C%20Germany!5e0!3m2!1sen!2sus!4v1699029714680!5m2!1sen!2sus";

// Häufige Anliegen, die sich ohne Nachricht klären lassen
const shortcuts = [
  { href: ALTKLAUSUREN_URL, icon: BookOpen, title: "Altklausuren", text: "Unsere Sammlung liegt auf StudIP." },
  { href: FUNDING_URL, icon: FileText, title: "Projektförderung", text: "Merkblatt zur Antragsstellung (PDF)" },
];

export default function page() {
  const { mail, strasse, plz, ort } = siteConfig.company;
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <PageHero eyebrow="Kontakt" title="Schreib uns" poster>
        <HeroLead>
          Fragen, Anregungen oder Ideen für eine Kooperation? Das Team des
          Fachschaftsrats Wirtschaftswissenschaften freut sich, von dir zu hören.
        </HeroLead>
      </PageHero>

      <div className="grid gap-10 md:grid-cols-[1fr_20rem] md:gap-12 lg:grid-cols-[1fr_22rem]">
        <section className="rounded-3xl border bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-black tracking-tight">Nachricht</h2>
          <p className="mb-6 mt-1 text-sm text-muted-foreground">Wir melden uns so schnell wie möglich bei dir.</p>
          <ContactForm className="max-w-none" />
        </section>

        <aside className="space-y-6 md:sticky md:top-24 md:self-start">
          <dl className="divide-y rounded-3xl border bg-card p-6">
            <div className="pb-4">
              <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-fsr">
                <Mail className="size-4" /> E-Mail
              </dt>
              <dd className="mt-1 break-words font-medium">
                <a href={`mailto:${mail}`} className="underline-offset-4 hover:text-fsr hover:underline">
                  {mail}
                </a>
              </dd>
            </div>
            <div className="pt-4">
              <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-fsr">
                <MapPin className="size-4" /> Adresse
              </dt>
              <dd className="mt-1 font-medium">
                {strasse}
                <br />
                {plz} {ort}
              </dd>
            </div>
          </dl>

          <div>
            <Eyebrow className="mb-3">Schneller ohne Nachricht</Eyebrow>
            <ul className="space-y-2">
              {shortcuts.map((s) => (
                <li key={s.title}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border p-4 transition hover:border-fsr/40 hover:bg-fsr/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr"
                  >
                    <s.icon className="size-5 shrink-0 text-fsr" />
                    <span className="min-w-0">
                      <span className="block font-bold leading-tight">{s.title}</span>
                      <span className="block text-xs text-muted-foreground">{s.text}</span>
                    </span>
                    <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground transition group-hover:text-fsr" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section>
        <SectionHeading eyebrow="Vor Ort" title="So findest du uns" className="mb-8">
          WiWi-Fakultät, {strasse}, {plz} {ort} – unsere Sitzungen finden in Raum 201 statt.
        </SectionHeading>
        <div className="h-80 overflow-hidden rounded-3xl border md:h-96">
          <IframeConsent
            iframe={{ src: MAPS_EMBED, className: "h-full w-full" }}
            label="Google Maps"
            disclaimerText="Bitte bestätige das Laden von externen Inhalten."
            providerLink="https://www.google.com"
          />
        </div>
      </section>

      <MeetingCard showContact={false} />

      <section>
        <SectionHeading eyebrow="@fsr.wiwi.halle" title="Folge uns auf Instagram" className="mb-8" />
        <InstagramEmbed />
      </section>
    </div>
  );
}

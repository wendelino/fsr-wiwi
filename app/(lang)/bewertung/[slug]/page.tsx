import BewertungForm from "@/components/forms/bewertung-form";
import { Reveal } from "@/components/motion";
import { HeroLead, PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Metadata } from "next";
import { notFound } from "next/navigation"; 

// Verfügbare Slugs
const AVAILABLE_SLUGS = ["repetitorium"] as const;

type Slug = (typeof AVAILABLE_SLUGS)[number];

// Mapping für Titel
const SLUG_TITLES: Record<Slug, string> = {
  repetitorium: "Repetitorium",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const p = await params;
  const slug = decodeURIComponent(p.slug);

  if (!AVAILABLE_SLUGS.includes(slug as Slug)) {
    return {
      title: "Bewertung nicht gefunden",
    };
  }

  const title = SLUG_TITLES[slug as Slug];

  return {
    title: `Bewertung - ${title}`,
    description: `Bewerte ${title}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await params;
  const slug = decodeURIComponent(p.slug);

  // Validiere Slug
  if (!AVAILABLE_SLUGS.includes(slug as Slug)) {
    notFound();
  }

  const title = SLUG_TITLES[slug as Slug];

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <PageHero eyebrow="Bewertung" title={title} poster>
        <HeroLead>Teile deine Erfahrungen und hilf anderen Studierenden.</HeroLead>
      </PageHero>

      <section className="grid gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
        <SectionHeading eyebrow="Anonym" title="Deine Bewertung">
          Alles, was du teilst, ist anonym und wird nicht veröffentlicht.
        </SectionHeading>
        <Reveal variant="scale" className="rounded-3xl border bg-card p-6 sm:p-8">
          <BewertungForm slug={slug} />
        </Reveal>
      </section>
    </div>
  );
}

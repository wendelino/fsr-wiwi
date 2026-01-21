import BewertungForm from "@/components/forms/bewertung-form";
import { PageHeader } from "@/components/Framer/PageHeader";
import { Section } from "@/components/Framer/Section";
import { Header } from "@/components/TextComponents";
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
    <>
      <PageHeader
        title={`Bewertung - ${title}`}
        subtitle="Teile deine Erfahrungen und hilf anderen Studierenden"
      />

      <Section className="grid md:grid-cols-2 lg:gap-32 items-center p-8 md:px-16 rounded-xl shadow-xl border">
       <div>
       <Header>
          Deine <span className="fsr-gradient">Bewertung</span>
        </Header>
        <p className="text-muted-foreground mb-2">
          Alles was du teilst ist anonym und wird nicht veröffentlicht.
        </p>
       </div>
        <BewertungForm slug={slug} />
      </Section>
    </>
  );
}

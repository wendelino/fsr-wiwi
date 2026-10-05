import { getEvents } from "@/app/_actions/event";
import { HeroLead, PageHero } from "@/components/page-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";
import InfiniteScroll from "./infinite-scroll";

export const metadata: Metadata = {
  title: "Eventkalender",
  description: "Bleib auf dem Laufenden über die neuesten Veranstaltungen",
  openGraph: {
    title: "Eventkalender",
    description: "Bleib auf dem Laufenden über die neuesten Veranstaltungen",
    url: "https://fsr-wiwi-halle.de/kalender",
    siteName: "Fachschaftsrat Wirtschaftswissenschaften",
    images: [
      {
        url: "https://fsr-wiwi-halle.de/logo.png",
        width: 1200,
        height: 630,
        alt: "Eventkalender",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventkalender",
    description: "Bleib auf dem Laufenden über die neuesten Veranstaltungen",
    images: ["https://fsr-wiwi-halle.de/logo.png"],
  },
};

export default function Page() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <PageHero eyebrow="Termine" title="Kalender" poster>
        <HeroLead>Bleib auf dem Laufenden über die neuesten Veranstaltungen.</HeroLead>
      </PageHero>
      <Suspense fallback={<Loading />}>
        <Content />
      </Suspense>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex flex-col gap-12">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="grid gap-4 sm:grid-cols-[5rem_1fr] sm:gap-6">
          <Skeleton className="size-16 rounded-2xl" />
          <div className="grid gap-3">
            <Skeleton className="h-28 rounded-3xl" />
            <Skeleton className="h-28 rounded-3xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function Content() {
  const { events, nextCursor } = await getEvents();

  return <InfiniteScroll initialEvents={events} initialCursor={nextCursor} />;
}

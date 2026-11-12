import { getEvents } from "@/app/_actions/event";
import { HeroLead, PageHero } from "@/components/page-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { pageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import InfiniteScroll from "./infinite-scroll";
import { INSTAGRAM_URL } from "@/lib/siteConfig";

export const metadata = pageMetadata({
  title: "Eventkalender",
  description: "Bleib auf dem Laufenden über die neuesten Veranstaltungen",
  path: "/kalender",
});

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
  const { events, nextCursor, failed } = await getEvents();

  if (failed) {
    return (
      <p role="alert" className="rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
        Die Termine konnten gerade nicht geladen werden. Lade die Seite gleich noch einmal oder schau auf{" "}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded font-semibold text-fsr underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr"
        >
          Instagram
        </a>{" "}
        vorbei.
      </p>
    );
  }

  return <InfiniteScroll initialEvents={events} initialCursor={nextCursor} />;
}

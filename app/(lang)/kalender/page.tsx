import { getEvents } from "@/app/_actions/event";
import { PageHeader } from "@/components/Framer/PageHeader";
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
    <>
      <PageHeader
        title="Eventkalender"
        subtitle={"Bleib auf dem Laufenden über die neuesten Veranstaltungen"}
      />
      <Suspense fallback={<Loading />}>
        <Content />
      </Suspense>
    </>
  );
}

function Loading() {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <div className="space-y-4" key={i}>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </>
  );
}

async function Content() {
  const { events, nextCursor } = await getEvents();

  return <InfiniteScroll initialEvents={events} initialCursor={nextCursor} />;
}

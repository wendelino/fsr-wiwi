"use server";
import { getEvents } from "@/app/_actions/event";
import { getLocationById } from "@/app/_actions/getLocations";
import { PageHeader } from "@/components/Framer/PageHeader";
import { Section } from "@/components/Framer/Section";
import { MapLoader } from "@/components/MapLoader";
import MyMap from "@/components/MyMap";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; title: string }>;
}): Promise<Metadata> {
  const p = await params;
  const title = decodeURIComponent(p.title);

  return {
    title: `${title}`,
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ lang: string; title: string }>;
}) {
  const p = await params;
  const title = decodeURIComponent(p.title);

  return (
    <Suspense fallback={<Loading />}>
      <Content title={title} />
    </Suspense>
  );
}
function Loading() {
  return (
    <>
      <PageHeader loading />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </>
  );
}

async function Content({ title }: { title: string }) {
  const events = await getEvents();
  const event = events.find((e) => e.title == title);

  if (!event)
    return (
      <PageHeader
        title={title + " nicht gefunden"}
        subtitle={"Dieses Event scheint nicht zu existieren."}
      />
    );

  const location = await getLocationById(event.location_id || ""); 
  const date =
    format(event.start, "EEEE dd.MM.yyyy, HH:mm ", { locale: de }) +
    "-" +
    format(event.end, " HH:mm");

  return (
    <>
      <PageHeader title={event.title} subtitle={date} />
      <Section>{event.description}</Section>
      {location && (
        <Section className="h-96 shadow-lg">
          <MapLoader locations={[location!]} />
        </Section>
      )}
    </>
  );
}

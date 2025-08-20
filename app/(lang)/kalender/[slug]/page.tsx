"use server";
import { getEvent } from "@/app/_actions/event";
import { PageHeader } from "@/components/Framer/PageHeader";
import { Section } from "@/components/Framer/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const p = await params;
  const slug = decodeURIComponent(p.slug);
  const { event } = await getEvent(slug);

  return {
    title: `${event?.title || "Event 404"}`,
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await params;
  const slug = decodeURIComponent(p.slug);

  return (
    <Suspense fallback={<Loading />}>
      <Content slug={slug} />
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

async function Content({ slug }: { slug: string }) {
  const { event } = await getEvent(slug);

  if (!event)
    return (
      <PageHeader
        title={"Event nicht gefunden"}
        subtitle={"Dieses Event scheint nicht zu existieren."}
      />
    );

  // const location = await getLocationById(event.location_id || "");
  const date =
    format(event.start, "EEEE dd.MM.yyyy, HH:mm ", { locale: de }) +
    "-" +
    format(event.end, " HH:mm");

  return (
    <>
      <PageHeader title={event.title} subtitle={date} />
      <Section className="whitespace-pre-line">{event.description}</Section>
      {/* {location && (
        <Section className="h-96 shadow-lg">
          <MapLoader locations={[location!]} />
        </Section>
      )} */}
    </>
  );
}

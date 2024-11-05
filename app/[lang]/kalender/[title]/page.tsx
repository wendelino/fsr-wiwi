import { getEvents } from "@/app/_actions/event";
import { PageHeader } from "@/components/Framer/PageHeader";
import { Section } from "@/components/Framer/Section";
import MyMap from "@/components/MyMap";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Suspense } from "react";

export default function page({
  params,
}: {
  params: { lang: string; title: string };
}) {
  const title = decodeURIComponent(params.title);

  return (
    <Suspense fallback={<EventSkeleton />}>
      <EventPageContent title={title} />
    </Suspense>
  );
}
function EventSkeleton() {
  return (
    <>
      <PageHeader title="Lädt Event..." subtitle="Bitte warten..." />
      <Section>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </Section>
      <Section className="h-96 bg-gray-200 animate-pulse rounded-lg shadow-lg"> </Section>
    </>
  );
}

async function EventPageContent({ title }: { title: string }) {
  const events = await getEvents();
  const event = events.find((e) => e.title == title);

  if (!event)
    return (
      <PageHeader
        title={title + " nicht gefunden"}
        subtitle={"Dieses Event scheint nicht zu existieren."}
      />
    );

  const date =
    format(event.start, "EEEE dd.MM.yyyy, hh:mm ", { locale: de }) +
    "-" +
    format(event.end, " hh:mm");

  return (
    <>
      <PageHeader title={event.title} subtitle={date} />
      <Section>{event.description}</Section>
      <Section className="h-96 shadow-lg">
        <MyMap locations={[event.location!]} />
      </Section>
    </>
  );
}
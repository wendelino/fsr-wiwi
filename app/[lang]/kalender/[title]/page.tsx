import { getEvents } from "@/app/_actions/event";
import { PageHeader } from "@/components/Framer/PageHeader";
import { Section } from "@/components/Framer/Section";
import MyMap from "@/components/MyMap";
import { Skeleton } from "@/components/ui/skeleton";
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

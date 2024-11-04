import { getEvents } from "@/app/_actions/event";
import { PageHeader } from "@/components/Framer/PageHeader";
import { Section } from "@/components/Framer/Section";
import MyMap from "@/components/MyMap";
import { format } from "date-fns";
import { de } from "date-fns/locale";

export default async function page({
  params,
}: {
  params: { lang: string; title: string };
}) {
  const title = decodeURIComponent(params.title);

  const events = await getEvents();
  const event = events.find((e) => e.title == title);

  if (!event)
    return (
      <PageHeader
        title={title + " nicht gefunden"}
        subtitle={"Dieses Event scheint nicht zu exisitieren."}
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

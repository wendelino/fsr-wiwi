"use server";
import { getEvent } from "@/app/_actions/event";
import RegisterForm from "@/components/forms/register-form";
import { PageHeader } from "@/components/Framer/PageHeader";
import { formatInTimeZone } from "date-fns-tz";
import { de } from "date-fns/locale";
import { Metadata } from "next";
import { InfoCard } from "@/components/info-card";
import BierpongForm from "@/components/forms/bierpong-form";
import BarHoppingForm from "@/components/forms/bar-hopping-form";

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
    description: event?.description.slice(0, 100) || "Event 404",
    openGraph: {
      title: `${event?.title || "Event 404"}`,
      description: event?.description.slice(0, 100) || "Event 404",
    },
    twitter: {
      title: `${event?.title || "Event 404"}`,
      description: event?.description.slice(0, 100) || "Event 404",
    },
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: PageProps) {
  const p = await params;
  const slug = p.slug;

  const { event } = await getEvent(slug);

  if (!event)
    return (
      <div>
        <div className="flex flex-col items-center mt-32 max-w-96 mx-auto ">
          <div className="font-semibold text-lg p-6 bg-secondary rounded-lg m-16 ">
            404 | Not found
          </div>
        </div>
        <InfoCard type="warning">
          Das Event existiert nicht oder wurde gelöscht.
        </InfoCard>
      </div>
    );
  const date =
    formatInTimeZone(event.start, "Europe/Berlin", "EEEE dd.MM.yyyy, HH:mm ", {
      locale: de,
    }) +
    "-" +
    formatInTimeZone(event.end, "Europe/Berlin", " HH:mm", { locale: de });

  if (!event.registrable || event.restSeats === 0) {
    return (
      <>
        <PageHeader title={event.title} subtitle={date} />
        <InfoCard type="warning" displayContact={false}>
          {!event.registrable
            ? "Dieses Event ist öffentlich. Es wird keine Anmeldung benötigt."
            : "Dieses Event ist bereits ausgebucht. Sorry :/"}
        </InfoCard>
      </>
    );
  }
  if (event.slug === "bar-tour") {
    return (
      <div className="space-y-6">
        <PageHeader title={event.title} subtitle={date} /> 
        <BarHoppingForm event={event} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title={event.title} subtitle={date} />
      <RegisterForm event={event} />
    </div>
  );
}

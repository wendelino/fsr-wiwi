"use server";
import { getEvent } from "@/app/_actions/event";
import RegisterForm from "@/components/forms/register-form";
import { PageHeader } from "@/components/Framer/PageHeader";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Metadata } from "next";
import { InfoCard } from "@/components/info-card";

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
    format(event.start, "EEEE dd.MM.yyyy, HH:mm ", { locale: de }) +
    "-" +
    format(event.end, " HH:mm");
    

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

  return (
    <div className="space-y-6">
      <PageHeader title={event.title} subtitle={date} /> 
      <InfoCard type="warning">
        Da wir nur eine begrenzte Anzahl an Plätzen haben, versuchen wir diese
        möglichst fair zu verteilen. Am Montag (6.10) um 15 Uhr werden die
        Anmeldungen geschlossen und die Plätze im Losverfahren verteilt. Du
        bekommst dann eine E-Mail mit einer Zu- oder Absage für deine
        Anmeldungen. Wir bitten um Verständnis, dass wir nicht alle Anmeldungen
        annehmen können.
      </InfoCard>
      <RegisterForm event={event} />
    </div>
  );
}

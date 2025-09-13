"use server";
import { getEvent } from "@/app/_actions/event";
import RegisterForm from "@/components/forms/register-form";
import { PageHeader } from "@/components/Framer/PageHeader";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Info, XCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
 

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
          <div className="font-semibold text-lg p-4 bg-secondary rounded-lg m-16 ">
            404 | Not found
          </div>
          <div className="font-semibold text-lg pb-8 text-center  ">
            Ooops... Das Event scheint nicht zu existieren.
          </div>

          <Link href="/kontakt" className="text-primary underline mt-6">
            Kontakt
          </Link>
        </div>
      </div>
    );

  const date =
    format(event.start, "EEEE dd.MM.yyyy, HH:mm ", { locale: de }) +
    "-" +
    format(event.end, " HH:mm");

  const handlers = () => {
    if (!event.registrable) {
      return {
        title: "Dieses Event ist öffentlich. Es wird keine Anmeldung benötigt.",
        icon: Info,
      };
    }

    // if (event.restSeats === 0)
    return {
      title: "Dieses Event ist bereits ausgebucht. Sorry :/",
      icon: XCircle,
    };
  };

  const Icon = handlers().icon;
  const Title = handlers().title;

  if (!event.registrable || event.restSeats === 0) {
    return (
      <>
        <PageHeader title={event.title} subtitle={date} />
        <div className="  max-w-96 mx-auto ">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <Icon className="w-10 h-10 text-muted-foreground mb-4 mx-auto" />
            <div className="font-semibold text-lg text-center mb-4">
              {Title}
            </div>
            <div className="flex justify-center">
              <Link href="/kontakt" className="text-primary underline">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title={event.title} subtitle={date} />
      <RegisterForm event={event} />
    </>
  );
}

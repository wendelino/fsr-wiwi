"use server";
import { getEvent } from "@/app/_actions/event";
import { FullBleed } from "@/components/full-bleed";
import { EventActions } from "@/components/events/event-actions";
import { EventFacts } from "@/components/events/event-facts";
import { EventHeader, EventNotFound } from "@/components/events/event-header";
import { EventMarkdown } from "@/components/events/event-markdown";
import { LotteryNote } from "@/components/events/event-status";
import { Skeleton } from "@/components/ui/skeleton";
import { ERSTI_PAGE, ERSTI_TAG } from "@/lib/ersti";
import { plainText } from "@/lib/events";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

const BACK = { href: "/kalender", label: "Alle Termine" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const p = await params;
  const slug = decodeURIComponent(p.slug);
  const { event } = await getEvent(slug);
  const title = event?.title || "Event 404";
  const description = event ? plainText(event.description).slice(0, 160) : "Event 404";

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
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
      <FullBleed>
        <div className="bg-fsr-deep">
          <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 md:py-16">
            <Skeleton className="h-4 w-28 bg-white/20" />
            <Skeleton className="h-14 w-3/4 bg-white/20" />
            <Skeleton className="h-8 w-80 bg-white/20" />
          </div>
        </div>
      </FullBleed>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </>
  );
}

async function Content({ slug }: { slug: string }) {
  const { event } = await getEvent(slug);
  if (!event) return <EventNotFound back={BACK} />;

  const past = event.end <= new Date();
  const isErsti = event.tagsNew?.includes(ERSTI_TAG);

  return (
    <>
      <EventHeader event={event} eyebrow={isErsti ? "Ersti-Woche" : "Termin"} back={BACK} past={past} />

      <div className="grid gap-10 md:grid-cols-[1fr_20rem] md:gap-12 lg:grid-cols-[1fr_22rem]">
        <article className="min-w-0">
          {event.description ? (
            <EventMarkdown className="text-lg leading-relaxed">{event.description}</EventMarkdown>
          ) : (
            <p className="text-muted-foreground">Zu diesem Termin gibt es noch keine Beschreibung.</p>
          )}
        </article>

        <aside className="space-y-5 self-start rounded-3xl border bg-card p-6 md:sticky md:top-24">
          <h2 className="text-xl font-black tracking-tight">Auf einen Blick</h2>
          <EventFacts event={event} />
          {!past && <LotteryNote event={event} />}
          <EventActions event={event} past={past} />
          {isErsti && (
            <Link
              href={ERSTI_PAGE + "#lineup"}
              className="group flex items-center justify-between rounded-2xl bg-fsr/10 px-4 py-3 text-sm font-semibold text-fsr transition hover:bg-fsr/15"
            >
              Zum Programm der Ersti-Woche
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
          )}
        </aside>
      </div>
    </>
  );
}

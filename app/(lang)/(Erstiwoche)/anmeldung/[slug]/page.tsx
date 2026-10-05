"use server";
import { getEvent } from "@/app/_actions/event";
import { EventActions } from "@/components/events/event-actions";
import { EventHeader, EventNotFound } from "@/components/events/event-header";
import { EventMarkdown } from "@/components/events/event-markdown";
import { LotteryNote } from "@/components/events/event-status";
import RegisterForm from "@/components/forms/register-form";
import UnilympicsForm from "@/components/forms/unilympics-form";
import { isFull, plainText } from "@/lib/events";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const BACK = { href: "/anmeldung", label: "Alle Anmeldungen" };

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const p = await params;
	const slug = decodeURIComponent(p.slug);
	const { event } = await getEvent(slug);
	const title = event ? `Anmeldung: ${event.title}` : "Event 404";
	const description = event ? plainText(event.description).slice(0, 160) : "Event 404";

	return {
		title,
		description,
		openGraph: { title, description },
		twitter: { title, description },
	};
}

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default async function page({ params }: PageProps) {
	const p = await params;
	const slug = p.slug;

	const { event } = await getEvent(slug);
	if (!event) return <EventNotFound back={BACK} />;

	const past = event.end <= new Date();
	const closed = !event.registrable || isFull(event) || past;

	return (
		<>
			<EventHeader event={event} eyebrow="Anmeldung" back={BACK} past={past} />

			<div className="grid gap-10 md:grid-cols-[1fr_minmax(0,28rem)] md:gap-12">
				<div className="min-w-0 space-y-6">
					{!past && <LotteryNote event={event} className="text-base" />}
					{event.description && (
						<EventMarkdown className="leading-relaxed">{event.description}</EventMarkdown>
					)}
					<Link
						href={"/kalender/" + event.slug}
						className="inline-flex items-center gap-1.5 text-sm font-semibold text-fsr underline-offset-4 hover:underline"
					>
						Termin im Kalender ansehen <ArrowRight className="size-4" />
					</Link>
				</div>

				<div className="md:sticky md:top-24 md:self-start">
					{closed ? (
						<ClosedCard event={event} past={past} />
					) : event.slug === "unilympics" ? (
						<UnilympicsForm event={event} />
					) : (
						<RegisterForm
							event={event}
							className="max-w-none sm:rounded-3xl sm:bg-card sm:shadow-none"
						/>
					)}
				</div>
			</div>
		</>
	);
}

function ClosedCard({ event, past }: { event: EventItem; past: boolean }) {
	const [title, text] = past
		? ["Schon vorbei", "Dieser Termin hat bereits stattgefunden."]
		: !event.registrable
			? ["Keine Anmeldung nötig", "Dieser Termin ist offen – kommt einfach vorbei."]
			: ["Leider ausgebucht", "Alle Plätze sind vergeben. Schau gern, wofür du dich sonst noch anmelden kannst."];
	return (
		<div className="space-y-5 rounded-3xl border bg-card p-6 sm:p-8">
			<div>
				<h2 className="text-2xl font-black tracking-tight">{title}</h2>
				<p className="mt-2 text-muted-foreground">{text}</p>
			</div>
			<EventActions event={event} past={past} showSignup={false} />
			{event.registrable && (
				<Link
					href="/anmeldung"
					className="group flex items-center justify-between rounded-2xl bg-fsr/10 px-4 py-3 text-sm font-semibold text-fsr transition hover:bg-fsr/15"
				>
					Andere Termine mit Anmeldung
					<ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
				</Link>
			)}
		</div>
	);
}

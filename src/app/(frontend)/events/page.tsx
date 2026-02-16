import type { Metadata } from "next/types";

import { CollectionArchive } from "@/components/CollectionArchive";
import { PageRange } from "@/components/PageRange";
import { Pagination } from "@/components/Pagination";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import PageClient from "./page.client";
import {
	Map as MapLibreMap,
	MapControls,
	MapRoute,
	FullMap,
} from "@/components/ui/map";
import {
	fetchRoute,
	formatDuration,
	formatDistance,
} from "@/utilities/routing";

export const dynamic = "force-static";
export const revalidate = 600;

export default async function Page() {
	const payload = await getPayload({ config: configPromise });

	const events = await payload.find({
		collection: "events",
		depth: 1,
		limit: 12,
		overrideAccess: false,
		select: {
			title: true,
			slug: true,
			start: true,
			end: true,
			location: true,
			meta: true,
		},
		sort: "-start",
	});
	const end = {
		lat: 51.489683,
		lng: 11.967735,
	};
	const start = { lat: 51.489729, lng: 11.984291 };
	// Fetch routes using the smart routing utility
	// Options: mode = 'car' | 'bike' | 'foot'
	// Providers: 'osrm' | 'openrouteservice' | 'graphhopper' | 'mapbox'
	const routes = await fetchRoute(start, end, {
		mode: "foot",
		provider: "google", // Change to 'openrouteservice' if OSRM foot doesn't work
	});
	return (
		<div className="pt-24 pb-24">
			<PageClient />
			<div className="container mb-16">
				<div className="prose dark:prose-invert max-w-none">
					<h1>Veranstaltungen</h1>
				</div>
			</div>

			<FullMap start={start} end={end} routes={routes} />
			{routes.length > 0 && (
				<div className="container mt-6 mb-8">
					<div className="bg-muted/50 rounded-lg p-4 border">
						<div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
							<div>
								<h3 className="text-sm font-medium text-muted-foreground mb-1">
									Laufzeit zur Veranstaltung
								</h3>
								<p className="text-2xl font-semibold">
									{formatDuration(routes[0].duration)}
								</p>
							</div>
							<div className="text-sm text-muted-foreground">
								<span className="font-medium">
									{formatDistance(routes[0].distance)}
								</span>{" "}
								Entfernung
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="container mb-8">
				<PageRange
					collection="events"
					currentPage={events.page}
					limit={12}
					totalDocs={events.totalDocs}
				/>
			</div>

			<CollectionArchive posts={events.docs} relationTo="events" />

			<div className="container">
				{events.totalPages > 1 && events.page && (
					<Pagination page={events.page} totalPages={events.totalPages} />
				)}
			</div>
		</div>
	);
}

export function generateMetadata(): Metadata {
	return {
		title: `Veranstaltungen`,
	};
}

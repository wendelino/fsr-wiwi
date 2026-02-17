import configPromise from "@payload-config";
import type { Metadata } from "next/types";
import { getPayload } from "payload";
import { CollectionArchive } from "@/components/CollectionArchive";
import { PageRange } from "@/components/PageRange";
import { Pagination } from "@/components/Pagination";
import { FullMap } from "@/components/ui/map";
import {
  fetchGoogleRoute,
  formatDistance,
  formatDuration,
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
    lat: 51.489_683,
    lng: 11.967_735,
  };
  const start = { lat: 51.489_729, lng: 11.984_291 };
  // Fetch routes using the smart routing utility
  // Options: mode = 'car' | 'bike' | 'foot'
  // Providers: 'osrm' | 'openrouteservice' | 'graphhopper' | 'mapbox'
  const routes = await fetchGoogleRoute(start, end, "walking");
  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Veranstaltungen</h1>
        </div>
      </div>

      <FullMap end={end} routes={routes} start={start} />
      {routes.length > 0 && (
        <div className="container mt-6 mb-8">
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="mb-1 font-medium text-muted-foreground text-sm">
                  Laufzeit zur Veranstaltung
                </h3>
                <p className="font-semibold text-2xl">
                  {formatDuration(routes[0].duration)}
                </p>
              </div>
              <div className="text-muted-foreground text-sm">
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
    title: "Veranstaltungen",
  };
}

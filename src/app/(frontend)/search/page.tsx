import configPromise from "@payload-config";
import type { Metadata } from "next/types";
import { getPayload } from "payload";
import {
  CollectionArchive,
  type CollectionArchiveItem,
} from "@/components/CollectionArchive";
import { Search } from "@/search/Component";

type Args = {
  searchParams: Promise<{
    q: string;
  }>;
};
export default async function Page({
  searchParams: searchParamsPromise,
}: Args) {
  const { q: query } = await searchParamsPromise;
  const payload = await getPayload({ config: configPromise });

  const searchResults = await payload.find({
    collection: "search",
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      doc: true,
      eventStart: true,
      eventEnd: true,
      eventLocation: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                "meta.description": {
                  like: query,
                },
              },
              {
                "meta.title": {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  });

  // Transform search results to include relationTo
  const results: CollectionArchiveItem[] = searchResults.docs.map((doc) => ({
    title: doc.title,
    slug: doc.slug,
    meta: doc.meta,
    categories: doc.categories,
    relationTo:
      typeof doc.doc === "object" && doc.doc?.relationTo
        ? (doc.doc.relationTo as "posts" | "pages" | "events")
        : "posts",
  }));

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Suchen</h1>

          <div className="mx-auto max-w-[50rem]">
            <Search />
          </div>
        </div>
      </div>

      {searchResults.totalDocs > 0 ? (
        <CollectionArchive posts={results} />
      ) : (
        <div className="container">Keine Ergebnisse gefunden.</div>
      )}
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: "Payload Website Template Search",
  };
}

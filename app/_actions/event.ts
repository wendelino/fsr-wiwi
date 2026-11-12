import "server-only";
import { cache } from "react";

type GET_Response = {
  items: EventItem[];
  nextCursor: string | null;
};

const BASE_URL = `${process.env.CMS_ENDPOINT}/event`;
const token = process.env.CMS_TOKEN;

// Tags und Slugs landen im Pfad bzw. in der Query des CMS
const TAG_PATTERN = /^[a-z0-9-]{1,64}$/i;

export async function getEvents(ctx?: {
  page?: number;
  tag?: string;
  limit?: number;
  filter?: { registrable?: boolean; upcoming?: boolean };
}): Promise<{ events: EventItem[]; nextCursor: string | null; failed: boolean }> {
  try {
    const limit = clampInt(ctx?.limit, 1, 100, 10);
    const page = clampInt(ctx?.page, 0, 10_000, 0);
    if (ctx?.tag && !TAG_PATTERN.test(ctx.tag)) throw new Error(`Ungültiger Tag: ${ctx.tag}`);
    const tag = ctx?.tag ? `/${ctx.tag}` : "";
    const filter = ctx?.filter
      ? `&filter=${encodeURIComponent(JSON.stringify(ctx.filter))}`
      : "";
    const url = `${BASE_URL}${tag}?limit=${limit}&page=${page}${filter}`;

    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    if (!response.ok) throw new Error(`CMS antwortet mit ${response.status}`);
    const data: GET_Response = await response.json();

    return {
      events: data.items.map(eventF),
      nextCursor: data.nextCursor,
      failed: false,
    };
  } catch (error) {
    console.error("Termine konnten nicht geladen werden:", error);
    return { events: [], nextCursor: null, failed: true };
  }
}

// cache: generateMetadata und die Seite fragen pro Aufruf nur einmal
export const getEvent = cache(async (slug: string) => {
  try {
    if (!slug || slug.length > 200) return { event: null };
    const url = `${BASE_URL}?slug=${encodeURIComponent(slug)}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    if (!response.ok) throw new Error(`CMS antwortet mit ${response.status}`);
    const data: GET_Response = await response.json();

    return { event: data.items.map(eventF)[0] ?? null };
  } catch (error) {
    console.error(`Termin "${slug}" konnte nicht geladen werden:`, error);
    return { event: null };
  }
});

function clampInt(value: unknown, min: number, max: number, fallback: number) {
  if (typeof value !== "number" || !Number.isInteger(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

function eventF(i: EventItem): EventItem {
  return {
    ...i,
    start: new Date(i.start),
    end: new Date(i.end),
    // Ältere Events aus dem CMS haben die Felder noch nicht
    isRandomSelection: i.isRandomSelection ?? false,
    isHighlight: i.isHighlight ?? false,
  };
}

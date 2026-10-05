import { getEvents } from "@/app/_actions/event";
import { eventHref } from "@/lib/events";
import { legislaturData } from "@/lib/data";
import { ERSTI_PAGE } from "@/lib/ersti";
import { siteConfig } from "@/lib/siteConfig";
import type { MetadataRoute } from "next";

// Wird beim Build erzeugt und stündlich mit neuen Terminen aus dem CMS aufgefrischt
export const revalidate = 3600;

// Nur öffentliche Seiten mit eigenem Inhalt. /mitglieder leitet weiter;
// Formular-, Bestätigungs- und Altseiten (verify-mail, cancel, spiel, go, lageplan) fehlen bewusst.
const STATIC_PAGES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/kalender", priority: 0.9 },
  { path: ERSTI_PAGE, priority: 0.9 },
  { path: "/anmeldung", priority: 0.8 },
  { path: "/asq", priority: 0.7 },
  { path: "/about", priority: 0.7 },
  { path: "/kontakt", priority: 0.7 },
  { path: "/awareness", priority: 0.6 },
  { path: "/impressum", priority: 0.2 },
  { path: "/datenschutz", priority: 0.2 },
];

async function getAllEvents() {
  const all: EventItem[] = [];
  for (let page = 0; page < 20; page++) {
    const { events, nextCursor } = await getEvents({ page, limit: 100 });
    all.push(...events);
    if (!nextCursor || events.length === 0) break;
  }
  return all;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();
  const events = await getAllEvents();

  return [
    ...STATIC_PAGES.map(({ path, priority }) => ({
      url: `${base}${path}`,
      priority,
    })),
    ...legislaturData.map(({ period }) => ({
      url: `${base}/mitglieder/${period}`,
      priority: 0.5,
    })),
    ...events.map((event) => ({
      url: `${base}${eventHref(event)}`,
      priority: event.end > now ? 0.6 : 0.3,
    })),
  ];
}

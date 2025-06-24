import { EventWithLocation } from "@/components/Event";

export async function getEvents() {
  console.log("get Events...");

  const orgLink = "fsr-wiwi";

  const eventecURL = `https://eventec.vercel.app/api/events?org_link=${orgLink}&nocache=${Date.now()}`;

  const url2 = "https://app.lnio.de/cms/veranstaltung/api?user_id=fsr-wiwi";
  const response = await fetch(url2, {
    method: "GET",
    cache: "no-store",
  });
  const data = await response.json();

  const events: EventWithLocation[] = data.map((e: any) => ({
    ...e,
    start: new Date(e.start),
    end: new Date(e.end),
  }));
  return events;
}

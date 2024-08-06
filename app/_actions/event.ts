"use server";

import { EventProps } from "@/components/Event";

export async function getEvents() {
  const orgLink = "fsr-wiwi";
  const response = await fetch(
    `https://eventec.vercel.app/api/get_events?org_link=${orgLink}`
  );
  const data = await response.json();

  const events: EventProps[] = data.map((e: any) => ({
    ...e,
    start: new Date(e.start),
    end: new Date(e.end),
  }));
  return events;
}

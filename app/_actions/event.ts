"use server";

import {  EventWithLocation } from "@/components/Event";

export async function getEvents() {
  console.log("get Events...");
  
  const orgLink = "fsr-wiwi";
  const response = await fetch(
    `https://eventec.vercel.app/api/events?org_link=${orgLink}`
  );
  const data = await response.json();

  console.log(data
    
  );
  

  const events: EventWithLocation[] = data.map((e: any) => ({
    ...e,
    start: new Date(e.start),
    end: new Date(e.end),
  }));
  return events;
}

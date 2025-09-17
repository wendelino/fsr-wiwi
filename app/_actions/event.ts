"use server";

import { siteConfig } from "@/lib/siteConfig";

type GET_Response = {
  items: EventItem[];
  nextCursor: string | null;
};

const BASE_URL = `${siteConfig.apiEndpoint}/event`;
const token = process.env.CMS_TOKEN;

export async function getEvents(ctx?: {
  page?: number;
  tag?: string;
  limit?: number;
  filter?: { registrable?: boolean };
}) {
  try {
    const limit = ctx?.limit || 10;
    const page = ctx?.page || 0;
    const tag = ctx?.tag ? `/${ctx.tag}` : "";
    const filter = ctx?.filter
      ? `&filter=${encodeURIComponent(JSON.stringify(ctx.filter))}`
      : "";
    const url = `${BASE_URL}${tag}?limit=${limit}&page=${page}${filter}`;

    const response = await fetch(url, {
      next: {
        revalidate: 60,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data: GET_Response = await response.json();

    const events: EventItem[] = data.items.map(eventF);
    return {
      events,
      nextCursor: data.nextCursor,
    };
  } catch (error) {
    console.log("Error fetching events", error);
    return {
      events: [],
      nextCursor: null,
    };
  }
}

export async function getEvent(slug: string) {
  try {
    const url = `${BASE_URL}?slug=${slug}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data: GET_Response = await response.json();

    const events: EventItem[] = data.items.map(eventF);
    return {
      event: events[0] || null,
    };
  } catch (error) {
    console.log("Error fetching events", error);
    return {
      event: null,
    };
  }
}

function eventF(i: EventItem): EventItem {
  return {
    ...i,
    start: new Date(i.start),
    end: new Date(i.end),
    
    maxGuests: null, // Override in API
    restSeats: null, // Override in API
  };
}

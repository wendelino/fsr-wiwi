"use server";
 
type GET_Response = {
  items: EventItem[];
  nextCursor: string | null;
};

const BASE_URL = "https://cms.fsr-wiwi-halle.de/api/public/event";
 

export async function getEvents(ctx?: {page?: number, tag?:string, limit?:number}) {
  try {
    const token = process.env.CMS_TOKEN;
    const limit = ctx?.limit || 10;
    const page = ctx?.page || 0;
    const tag = ctx?.tag ? `/${ctx.tag}` : null
    const url = `${BASE_URL}${tag}?limit=${limit}&page=${page}`;

    const response = await fetch(url, {
      // next: {
      //   revalidate: 1,
      // },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data: GET_Response = await response.json();

    const events: EventItem[] = data.items.map((e) => ({
      ...e,
      start: new Date(e.start),
      end: new Date(e.end),
    }));
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
    const token = process.env.CMS_TOKEN;
    const url = `${BASE_URL}?slug=${slug}`;

    const response = await fetch(url, {
      next: {
        revalidate: 1,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data: GET_Response = await response.json();

    const events: EventItem[] = data.items.map((e) => ({
      ...e,
      start: new Date(e.start),
      end: new Date(e.end),
    }));
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

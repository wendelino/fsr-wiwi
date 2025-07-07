import { EventWithLocation } from "@/components/Event";
import { promises as fs } from "fs";
import path from "path";

export async function getEvents() { 
  const filePath = path.join(process.cwd(), "data/events.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(fileContents);

  const events: EventWithLocation[] = data.map((e: any) => ({
    ...e,
    start: new Date(e.start),
    end: new Date(e.end),
  }));
  return events;
}

 
import { LocationProps } from "@/components/Event";
import { promises as fs } from "fs";
import path from "path";

export async function getLocations() {
   
     const filePath = path.join(process.cwd(), "data/locations.json");
     const fileContents = await fs.readFile(filePath, "utf-8");
     const data = JSON.parse(fileContents);
  
    const locations: LocationProps[] = data.map((e: any) => ({
      ...e, 
    }));
    return locations;
  }

export async function getLocationById(id: string): Promise<LocationProps | null> {
  const locations = await getLocations();
  const location = locations.find((l) => l.id === id);
  return location || null;
}
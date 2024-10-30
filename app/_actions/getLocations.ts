 
import { LocationProps } from "@/components/Event";

export async function getLocations() {
    const orgLink = "fsr-wiwi"; 
    const response = await fetch(
      `https://eventec.vercel.app/api/locations?org_link=${orgLink}&nocache=${Date.now()}`,
      {
        method: "GET",
        cache: 'no-store'
      } 
    );
    const data = await response.json();
  
    const locations: LocationProps[] = data.map((e: any) => ({
      ...e,
      start: new Date(e.start),
      end: new Date(e.end),
    }));
    return locations;
  }
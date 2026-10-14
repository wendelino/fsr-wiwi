import { LocationProps } from "@/components/Event";
import locations from "@/data/locations.json";

export async function getLocations(): Promise<LocationProps[]> {
  return locations;
}

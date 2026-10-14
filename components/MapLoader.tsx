"use client";
import { MapIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { LocationProps } from "./Event";

// Leaflet braucht `window`, deshalb nur im Browser laden
const Map = dynamic(() => import("@/components/MyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full animate-pulse items-center justify-center rounded-xl bg-muted font-semibold">
      <MapIcon className="size-32" />
    </div>
  ),
});

export function MapLoader({ locations }: { locations: LocationProps[] }) {
  return <Map locations={locations} />;
}

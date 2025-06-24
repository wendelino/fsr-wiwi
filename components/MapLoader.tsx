"use client";
import { MapIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { LocationProps } from "./Event";
import MyMap from "@/components/MyMap";

export function MapLoader({ locations }: { locations: LocationProps[] }) {
  const Map = dynamic(() => import("@/components/MyMap"), {
    loading: () => (
      <div className="w-full h-full animate-pulse bg-muted flex items-center justify-center  font-semibold rounded-xl">
         <MapIcon className="size-32"/>
      </div>
    ), 
  });
  return <MyMap locations={locations}/>;
}

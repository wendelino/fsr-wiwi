"use client";
import { LoaderCircleIcon, MapIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LocationProps } from "./Event";

export function MapLoader({ locations }: { locations: LocationProps[] }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);
  const Map = dynamic(() => import("@/components/MyMap"), {
    loading: () => (
      <div className="w-full h-full animate-pulse bg-muted flex items-center justify-center  font-semibold rounded-xl">
        <MapIcon className="size-32" />
      </div>
    ),
  });
  return open ? (
    <Map locations={locations} />
  ) : (
    <div className="w-full h-full animate-pulse bg-muted flex items-center justify-center  font-semibold rounded-xl">
      <LoaderCircleIcon className="size-32 animate-spin" />
    </div>
  );
}

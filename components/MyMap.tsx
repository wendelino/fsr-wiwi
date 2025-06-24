"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { LocationCard, LocationProps } from "./Event";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import React, { useMemo, useState } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";

// Typ für LatLngExpression importieren
import { LatLngExpression } from "leaflet";

export default function MyMap({ locations }: { locations: LocationProps[] }) {
  // CSS-Dateien nur auf dem Client laden
  useEffect(() => {
    import("./MyMap.css"); 
  }, []);

  const center: LatLngExpression = locations.length > 0 ? [locations[0].lat, locations[0].long] : [51.1657, 10.4515]; // Standardkoordinaten, falls keine Orte vorhanden sind

  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom={false}
      className="w-full h-full rounded-lg shadow-xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations &&
        locations.map((loc) => (
          <Marker position={[loc.lat, loc.long]} key={loc.label}>
            <Popup>
              <LocationCard location={loc} />
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}

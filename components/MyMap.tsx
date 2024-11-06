"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { LocationCard, LocationProps } from "./Event";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// Typ für LatLngExpression importieren
import { LatLngExpression } from "leaflet";

export default function MyMap({ locations }: { locations: LocationProps[] }) {
  // CSS-Dateien nur auf dem Client laden
  useEffect(() => {
    import("./MyMap.css"); 
  }, []);

  const center: LatLngExpression = [locations[0].lat, locations[0].long];

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

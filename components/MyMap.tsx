"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect, useState } from "react";
import { Location_DB } from "@prisma/client";
import { LocationCard } from "./Event";

export default function MyMap() {
  const [locations, setLocations] = useState<Location_DB[]>([]);

  // useEffect(() => {
  //   const fetchLocations = async () => {
  //     const response = await fetch("/api/locations"); // Passen Sie den API-Endpunkt entsprechend an
  //     const data: Location_DB[] = await response.json();
  //     setLocations(data);
  //   };

  //   fetchLocations();
  // }, []);

  return (
    <MapContainer
      center={[51.48654, 11.97353]}
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

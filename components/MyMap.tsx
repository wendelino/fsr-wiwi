"use client";
import { LocationCard, LocationProps } from "./Event";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";

export default function MyMap({ locations }: { locations: LocationProps[] }) {
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

      {locations.map((loc) => (
        <Marker position={[loc.lat, loc.long]} key={loc.id}>
          <Popup>
            <LocationCard location={loc} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

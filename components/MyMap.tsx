"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LocationCard, LocationProps } from "./Event";
import { LatLngExpression } from "leaflet";

export default function MyMap({locations}: {locations: LocationProps[]}) { 

  const center: LatLngExpression = [locations[0].lat, locations[0].long]

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

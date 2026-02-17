/**
 * Routing Utilities - Multiple API Options
 *
 * Supports various routing APIs for different use cases
 */

export interface RouteData {
  coordinates: [number, number][];
  distance: number; // meters
  duration: number; // seconds
}

export interface RoutePoint {
  lat: number;
  lng: number;
}

// ========================================
// Polyline Decoder (for Google)
// ========================================

function decodePolyline(encoded: string): [number, number][] {
  const coordinates: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;
  const decodeDelta = (value: number): number => {
    const half = Math.floor(value / 2);
    return value % 2 !== 0 ? -(half + 1) : half;
  };

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte: number;

    // Decode latitude
    do {
      byte = encoded.charCodeAt(index++) - 63;
      const chunk = byte % 32;
      result += chunk * 2 ** shift;
      shift += 5;
    } while (byte >= 0x20);
    const deltaLat = decodeDelta(result);
    lat += deltaLat;

    // Decode longitude
    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      const chunk = byte % 32;
      result += chunk * 2 ** shift;
      shift += 5;
    } while (byte >= 0x20);
    const deltaLng = decodeDelta(result);
    lng += deltaLng;

    coordinates.push([lng / 1e5, lat / 1e5]);
  }

  return coordinates;
}

export async function fetchGoogleRoute(
  start: RoutePoint,
  end: RoutePoint,
  mode: "driving" | "walking" | "bicycling" | "transit" = "driving"
): Promise<RouteData[]> {
  const key = process.env.GOOGLE_MAPS_API_KEY;

  if (!key) {
    console.error("Google Maps API key not found");
    return [];
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&mode=${mode}&key=${key}`
    );

    const data = await response.json();

    if (data.status !== "OK") {
      console.error(
        "Google Directions API error:",
        data.status,
        data.error_message
      );
      return [];
    }

    if (data.routes?.[0]) {
      const route = data.routes[0];
      const leg = route.legs[0];

      // Decode the overview polyline
      const coordinates = decodePolyline(route.overview_polyline.points);

      return [
        {
          coordinates,
          duration: leg.duration.value, // seconds
          distance: leg.distance.value, // meters
        },
      ];
    }
    return [];
  } catch (error) {
    console.error("Google routing failed:", error);
    return [];
  }
}

// ========================================
// Helper Functions
// ========================================

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (minutes === 0) {
    return `${remainingSeconds} Sek.`;
  }
  if (remainingSeconds === 0) {
    return `${minutes} Min.`;
  }
  return `${minutes} Min. ${remainingSeconds} Sek.`;
}

export function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${Math.round(meters)} m`;
}

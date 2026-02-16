/**
 * Routing Utilities - Multiple API Options
 * 
 * Supports various routing APIs for different use cases
 */

export interface RouteData {
  coordinates: [number, number][]
  duration: number // seconds
  distance: number // meters
}

export interface RoutePoint {
  lat: number
  lng: number
}

// ========================================
// Polyline Decoder (for Google)
// ========================================

function decodePolyline(encoded: string): [number, number][] {
  const coordinates: [number, number][] = []
  let index = 0
  let lat = 0
  let lng = 0

  while (index < encoded.length) {
    let shift = 0
    let result = 0
    let byte: number

    // Decode latitude
    do {
      byte = encoded.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)
    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1
    lat += deltaLat

    // Decode longitude
    shift = 0
    result = 0
    do {
      byte = encoded.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)
    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1
    lng += deltaLng

    coordinates.push([lng / 1e5, lat / 1e5])
  }

  return coordinates
}

// ========================================
// 1. OSRM API (Free, Open Source)
// ========================================

export async function fetchOSRMRoute(
  start: RoutePoint,
  end: RoutePoint,
  profile: 'car' | 'bike' | 'foot' = 'car'
): Promise<RouteData[]> {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/${profile}/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
    )
    const data = await response.json()
    
    if (data.routes?.length > 0) {
      return data.routes.map((route: {
        geometry: { coordinates: [number, number][] }
        duration: number
        distance: number
      }) => ({
        coordinates: route.geometry.coordinates,
        duration: route.duration,
        distance: route.distance,
      }))
    }
    return []
  } catch (error) {
    console.error('OSRM routing failed:', error)
    return []
  }
}

// ========================================
// 2. OpenRouteService API (Free with API Key)
// ========================================

export async function fetchOpenRouteServiceRoute(
  start: RoutePoint,
  end: RoutePoint,
  profile: 'driving-car' | 'cycling-regular' | 'foot-walking' = 'driving-car',
  apiKey?: string
): Promise<RouteData[]> {
  const key = apiKey || process.env.NEXT_PUBLIC_ORS_API_KEY
  
  if (!key) {
    console.error('OpenRouteService API key not found')
    return []
  }

  try {
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/${profile}?start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`,
      {
        headers: {
          'Authorization': key,
        },
      }
    )
    
    const data = await response.json()
    
    if (data.features?.[0]) {
      const feature = data.features[0]
      return [{
        coordinates: feature.geometry.coordinates,
        duration: feature.properties.summary.duration,
        distance: feature.properties.summary.distance,
      }]
    }
    return []
  } catch (error) {
    console.error('OpenRouteService routing failed:', error)
    return []
  }
}

// ========================================
// 3. GraphHopper API (Free Tier Available)
// ========================================

export async function fetchGraphHopperRoute(
  start: RoutePoint,
  end: RoutePoint,
  vehicle: 'car' | 'bike' | 'foot' = 'car',
  apiKey?: string
): Promise<RouteData[]> {
  const key = apiKey || process.env.NEXT_PUBLIC_GRAPHHOPPER_API_KEY
  
  if (!key) {
    console.error('GraphHopper API key not found')
    return []
  }

  try {
    const response = await fetch(
      `https://graphhopper.com/api/1/route?point=${start.lat},${start.lng}&point=${end.lat},${end.lng}&vehicle=${vehicle}&locale=de&key=${key}&points_encoded=false`
    )
    
    const data = await response.json()
    
    if (data.paths?.[0]) {
      const path = data.paths[0]
      return [{
        coordinates: path.points.coordinates.map((c: number[]) => [c[0], c[1]]),
        duration: path.time / 1000, // Convert ms to seconds
        distance: path.distance,
      }]
    }
    return []
  } catch (error) {
    console.error('GraphHopper routing failed:', error)
    return []
  }
}

// ========================================
// 4. Google Directions API
// ========================================

export async function fetchGoogleRoute(
  start: RoutePoint,
  end: RoutePoint,
  mode: 'driving' | 'walking' | 'bicycling' | 'transit' = 'driving',
  apiKey?: string
): Promise<RouteData[]> {
  const key = apiKey || process.env.GOOGLE_MAPS_API_KEY
  
  if (!key) {
    console.error('Google Maps API key not found')
    return []
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&mode=${mode}&key=${key}`
    )
    
    const data = await response.json()
    
    if (data.status !== 'OK') {
      console.error('Google Directions API error:', data.status, data.error_message)
      return []
    }
    
    if (data.routes?.[0]) {
      const route = data.routes[0]
      const leg = route.legs[0]
      
      // Decode the overview polyline
      const coordinates = decodePolyline(route.overview_polyline.points)
      
      return [{
        coordinates,
        duration: leg.duration.value, // seconds
        distance: leg.distance.value, // meters
      }]
    }
    return []
  } catch (error) {
    console.error('Google routing failed:', error)
    return []
  }
}

// ========================================
// 5. Mapbox Directions API (Paid)
// ========================================

export async function fetchMapboxRoute(
  start: RoutePoint,
  end: RoutePoint,
  profile: 'driving' | 'walking' | 'cycling' = 'driving',
  apiKey?: string
): Promise<RouteData[]> {
  const key = apiKey || process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  
  if (!key) {
    console.error('Mapbox access token not found')
    return []
  }

  try {
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${profile}/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&access_token=${key}`
    )
    
    const data = await response.json()
    
    if (data.routes?.[0]) {
      const route = data.routes[0]
      return [{
        coordinates: route.geometry.coordinates,
        duration: route.duration,
        distance: route.distance,
      }]
    }
    return []
  } catch (error) {
    console.error('Mapbox routing failed:', error)
    return []
  }
}

// ========================================
// Smart Router with Fallback
// ========================================

export async function fetchRoute(
  start: RoutePoint,
  end: RoutePoint,
  options: {
    mode?: 'car' | 'bike' | 'foot' | 'transit'
    provider?: 'osrm' | 'openrouteservice' | 'graphhopper' | 'google' | 'mapbox'
    apiKey?: string
  } = {}
): Promise<RouteData[]> {
  const { mode = 'car', provider = 'osrm', apiKey } = options

  // Try primary provider
  switch (provider) {
    case 'osrm':
      return await fetchOSRMRoute(start, end, mode as 'car' | 'bike' | 'foot')
    
    case 'openrouteservice': {
      const profile = mode === 'car' ? 'driving-car' : mode === 'bike' ? 'cycling-regular' : 'foot-walking'
      return await fetchOpenRouteServiceRoute(start, end, profile, apiKey)
    }
    
    case 'graphhopper':
      return await fetchGraphHopperRoute(start, end, mode as 'car' | 'bike' | 'foot', apiKey)
    
    case 'google': {
      const googleMode = mode === 'car' ? 'driving' : mode === 'bike' ? 'bicycling' : mode === 'foot' ? 'walking' : 'transit'
      return await fetchGoogleRoute(start, end, googleMode, apiKey)
    }
    
    case 'mapbox': {
      const profile = mode === 'car' ? 'driving' : mode === 'bike' ? 'cycling' : 'walking'
      return await fetchMapboxRoute(start, end, profile, apiKey)
    }
    
    default:
      // Fallback to OSRM
      return await fetchOSRMRoute(start, end, mode as 'car' | 'bike' | 'foot')
  }
}

// ========================================
// Helper Functions
// ========================================

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  
  if (minutes === 0) {
    return `${remainingSeconds} Sek.`
  }
  if (remainingSeconds === 0) {
    return `${minutes} Min.`
  }
  return `${minutes} Min. ${remainingSeconds} Sek.`
}

export function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`
  }
  return `${Math.round(meters)} m`
}

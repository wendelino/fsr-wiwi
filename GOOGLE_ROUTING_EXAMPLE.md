# Google Routing - Verwendungsbeispiel

## ✨ Google in events/page.tsx verwenden

### Einfache Verwendung (Fußgänger)

```typescript
// src/app/(frontend)/events/page.tsx

const start = {
  lat: 51.478679, 
  lng: 11.983885
}
const end = {
  lat: 51.486343, 
  lng: 11.968871,
}

// Google als Provider
const routes = await fetchRoute(start, end, {
  mode: 'foot',       // Fußgänger
  provider: 'google',  // ← Google verwenden
})
```

### Mit ÖPNV (Öffentliche Verkehrsmittel)

```typescript
// Für Bus/Bahn-Verbindungen
const routes = await fetchRoute(start, end, {
  mode: 'transit',    // ← ÖPNV-Modus (nur bei Google!)
  provider: 'google',
})

// Zeigt die beste Bus/Bahn-Verbindung
if (routes.length > 0) {
  console.log(`Mit ÖPNV: ${formatDuration(routes[0].duration)}`)
  console.log(`Entfernung: ${formatDistance(routes[0].distance)}`)
}
```

### Multi-Modal Vergleich

Zeige alle Optionen auf einmal:

```typescript
// Hole alle Routen parallel
const [footRoute, bikeRoute, carRoute, transitRoute] = await Promise.all([
  fetchRoute(start, end, { mode: 'foot', provider: 'google' }),
  fetchRoute(start, end, { mode: 'bike', provider: 'google' }),
  fetchRoute(start, end, { mode: 'car', provider: 'google' }),
  fetchRoute(start, end, { mode: 'transit', provider: 'google' }),
])

// Zeige die beste Option
const options = [
  { name: '🚶 Zu Fuß', routes: footRoute },
  { name: '🚲 Fahrrad', routes: bikeRoute },
  { name: '🚗 Auto', routes: carRoute },
  { name: '🚌 ÖPNV', routes: transitRoute },
]

options.forEach(({ name, routes }) => {
  if (routes.length > 0) {
    console.log(`${name}: ${formatDuration(routes[0].duration)}`)
  }
})
```

### Mit Fallback

Falls Google nicht verfügbar ist:

```typescript
// Versuche Google, falle zurück zu OpenRouteService
let routes = await fetchRoute(start, end, {
  mode: 'foot',
  provider: 'google',
})

if (routes.length === 0) {
  console.log('Google nicht verfügbar, nutze OpenRouteService')
  routes = await fetchRoute(start, end, {
    mode: 'foot',
    provider: 'openrouteservice',
  })
}

if (routes.length === 0) {
  console.log('OpenRouteService nicht verfügbar, nutze OSRM mit Auto')
  routes = await fetchRoute(start, end, {
    mode: 'car',
    provider: 'osrm',
  })
}
```

### Smart Routing Component

Erstelle eine Komponente, die automatisch die beste Option wählt:

```typescript
// src/app/(frontend)/events/page.tsx

async function getSmartRoute(start: RoutePoint, end: RoutePoint) {
  // Bevorzuge Google (beste Qualität)
  if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    const routes = await fetchRoute(start, end, {
      mode: 'foot',
      provider: 'google',
    })
    if (routes.length > 0) return { routes, provider: 'google' }
  }

  // Fallback zu OpenRouteService
  if (process.env.NEXT_PUBLIC_ORS_API_KEY) {
    const routes = await fetchRoute(start, end, {
      mode: 'foot',
      provider: 'openrouteservice',
    })
    if (routes.length > 0) return { routes, provider: 'openrouteservice' }
  }

  // Letzter Fallback: OSRM mit Auto
  const routes = await fetchRoute(start, end, {
    mode: 'car',
    provider: 'osrm',
  })
  return { routes, provider: 'osrm' }
}

// Verwenden:
const { routes, provider } = await getSmartRoute(start, end)
console.log(`Nutze Provider: ${provider}`)
```

## 🎨 UI-Beispiele

### Route Info Card

```typescript
{routes.length > 0 && (
  <div className="container mt-6 mb-8">
    <div className="bg-muted/50 rounded-lg p-4 border">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            🚶 Zu Fuß zur Veranstaltung
          </h3>
          <p className="text-2xl font-semibold">
            {formatDuration(routes[0].duration)}
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">
            {formatDistance(routes[0].distance)}
          </span> Entfernung
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Powered by Google Maps
      </p>
    </div>
  </div>
)}
```

### Multi-Modal Tabs

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default async function EventsPage() {
  // Hole alle Routen
  const [footRoutes, transitRoutes] = await Promise.all([
    fetchRoute(start, end, { mode: 'foot', provider: 'google' }),
    fetchRoute(start, end, { mode: 'transit', provider: 'google' }),
  ])

  return (
    <Tabs defaultValue="foot">
      <TabsList>
        <TabsTrigger value="foot">🚶 Zu Fuß</TabsTrigger>
        <TabsTrigger value="transit">🚌 ÖPNV</TabsTrigger>
      </TabsList>
      
      <TabsContent value="foot">
        {footRoutes.length > 0 && (
          <div>
            <p>Dauer: {formatDuration(footRoutes[0].duration)}</p>
            <p>Entfernung: {formatDistance(footRoutes[0].distance)}</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="transit">
        {transitRoutes.length > 0 && (
          <div>
            <p>Dauer: {formatDuration(transitRoutes[0].duration)}</p>
            <p>Mit Bus & Bahn</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
```

### Provider Badge

```typescript
function ProviderBadge({ provider }: { provider: string }) {
  const badges = {
    google: '🗺️ Google Maps',
    openrouteservice: '🌍 OpenRouteService',
    osrm: '🚗 OSRM',
  }
  
  return (
    <span className="text-xs bg-muted px-2 py-1 rounded">
      {badges[provider] || provider}
    </span>
  )
}
```

## 🔧 Konfiguration

### Umgebungsvariablen

```bash
# .env.local

# Google Maps (empfohlen für beste Qualität)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=dein-google-key

# Fallback: OpenRouteService
NEXT_PUBLIC_ORS_API_KEY=dein-ors-key

# Weitere Optionen
NEXT_PUBLIC_GRAPHHOPPER_API_KEY=dein-graphhopper-key
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=dein-mapbox-token
```

### Provider Priorität

```typescript
// Definiere die Reihenfolge der Provider
const PROVIDER_PRIORITY = ['google', 'openrouteservice', 'osrm'] as const

async function getRouteWithFallback(
  start: RoutePoint, 
  end: RoutePoint, 
  mode: 'car' | 'bike' | 'foot' | 'transit' = 'foot'
) {
  for (const provider of PROVIDER_PRIORITY) {
    try {
      const routes = await fetchRoute(start, end, { mode, provider })
      if (routes.length > 0) {
        return { routes, provider }
      }
    } catch (error) {
      console.warn(`Provider ${provider} failed, trying next...`)
    }
  }
  
  throw new Error('All routing providers failed')
}
```

## 📊 Performance

### Caching (empfohlen)

```typescript
import { unstable_cache } from 'next/cache'

const getCachedRoute = unstable_cache(
  async (startLat: number, startLng: number, endLat: number, endLng: number) => {
    const start = { lat: startLat, lng: startLng }
    const end = { lat: endLat, lng: endLng }
    return await fetchRoute(start, end, { 
      mode: 'foot', 
      provider: 'google' 
    })
  },
  ['google-routes'],
  { 
    revalidate: 3600, // Cache für 1 Stunde
    tags: ['routes'] 
  }
)

// Verwenden:
const routes = await getCachedRoute(
  start.lat, start.lng, 
  end.lat, end.lng
)
```

## 🎯 Best Practices

1. **Immer Fallback haben:** Google → OpenRouteService → OSRM
2. **Caching nutzen:** Routen ändern sich selten
3. **Error Handling:** Zeige hilfreiche Fehler-Meldungen
4. **Loading States:** Zeige Lade-Animation
5. **Budget Alerts:** Setze Google Cloud Budget-Limits

## 🚀 Los geht's!

1. **API Key holen:** https://console.cloud.google.com/
2. **In `.env.local` eintragen**
3. **In Code verwenden:** `provider: 'google'`
4. **Testen:** `pnpm dev`

**Siehe GOOGLE_ROUTING_SETUP.md für Details!**

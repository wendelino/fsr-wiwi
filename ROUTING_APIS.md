# Routing APIs - Dokumentation

## Problem

Die OSRM API mit dem Profil `foot` funktioniert manchmal nicht zuverlässig. Hier sind mehrere Alternativen.

## ✅ Sofort verfügbar (Keine API Keys)

### 1. OSRM mit Auto-Routing
```typescript
const routes = await fetchRoute(start, end, {
  mode: 'car',      // statt 'foot'
  provider: 'osrm',
})
```

**Vorteile:**
- ✅ Komplett kostenlos
- ✅ Keine API Keys erforderlich
- ✅ Funktioniert zuverlässig
- ✅ Schnell

**Nachteile:**
- ❌ Auto-Routing statt Fußgänger
- ❌ Manchmal instabil bei hoher Last

## 🔑 Mit kostenlosem API Key

### 2. OpenRouteService (Empfohlen!)

**Kostenlos:** 2000 Anfragen/Tag

1. **API Key holen:**
   - Gehe zu: https://openrouteservice.org/dev/#/signup
   - Registrieren (kostenlos)
   - API Key kopieren

2. **In `.env.local` einfügen:**
   ```bash
   NEXT_PUBLIC_ORS_API_KEY=dein-api-key-hier
   ```

3. **Verwenden:**
   ```typescript
   const routes = await fetchRoute(start, end, {
     mode: 'foot',
     provider: 'openrouteservice',
   })
   ```

**Profile:**
- `foot` → Fußgänger ✅
- `bike` → Fahrrad
- `car` → Auto

**Vorteile:**
- ✅ Zuverlässiges Fußgänger-Routing
- ✅ 2000 Anfragen/Tag kostenlos
- ✅ Sehr gute Qualität
- ✅ Unterstützt viele Profile

### 3. GraphHopper

**Kostenlos:** 500 Anfragen/Tag

1. **API Key holen:**
   - Gehe zu: https://www.graphhopper.com/
   - Sign up (kostenlos)
   - API Key kopieren

2. **In `.env.local` einfügen:**
   ```bash
   NEXT_PUBLIC_GRAPHHOPPER_API_KEY=dein-api-key-hier
   ```

3. **Verwenden:**
   ```typescript
   const routes = await fetchRoute(start, end, {
     mode: 'foot',
     provider: 'graphhopper',
   })
   ```

**Vorteile:**
- ✅ Sehr schnell
- ✅ Gute Qualität
- ✅ Einfache API

### 4. Google Directions API ⭐ Neu!

**Kostenlos:** $200 Guthaben/Monat = ~40.000 Anfragen/Monat

1. **API Key holen:**
   - Gehe zu: https://console.cloud.google.com/
   - Projekt erstellen
   - "Directions API" aktivieren
   - API Key erstellen
   - **Billing-Konto verbinden** (erforderlich, auch für kostenlose Nutzung)

2. **In `.env.local` einfügen:**
   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=dein-api-key-hier
   ```

3. **Verwenden:**
   ```typescript
   const routes = await fetchRoute(start, end, {
     mode: 'foot',     // oder 'transit' für ÖPNV!
     provider: 'google',
   })
   ```

**Einzigartig bei Google:**
- ✅ **Öffentliche Verkehrsmittel** (transit mode)
- ✅ Echtzeit-Verkehrsdaten
- ✅ Alternative Routen
- ✅ Weltweite Premium-Qualität

**Vorteile:**
- ✅ Beste Datenqualität
- ✅ Sehr zuverlässig
- ✅ Großzügiges Kontingent (40k/Monat)
- ✅ ÖPNV-Routing

**Nachteile:**
- ⚠️ Billing-Konto erforderlich
- ⚠️ Kreditkarte notwendig (auch für Free Tier)

### 5. Mapbox Directions

**Kostenlos:** 100.000 Anfragen/Monat

1. **API Key holen:**
   - Gehe zu: https://www.mapbox.com/
   - Sign up
   - Access Token kopieren

2. **In `.env.local` einfügen:**
   ```bash
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=dein-token-hier
   ```

3. **Verwenden:**
   ```typescript
   const routes = await fetchRoute(start, end, {
     mode: 'foot',
     provider: 'mapbox',
   })
   ```

**Vorteile:**
- ✅ Sehr großzügiges kostenloses Kontingent
- ✅ Hervorragende Qualität
- ✅ Beste Dokumentation

## 🚀 Empfohlene Lösung

### Option 1: Schnellfix (keine Keys)
```typescript
// In src/app/(frontend)/events/page.tsx
const routes = await fetchRoute(start, end, {
  mode: 'car',      // Auto statt Fuß funktioniert immer
  provider: 'osrm',
})
```

### Option 2: Beste Qualität (mit kostenlosem Key)
```typescript
// 1. API Key holen: https://openrouteservice.org/dev/#/signup
// 2. In .env.local: NEXT_PUBLIC_ORS_API_KEY=...
// 3. Verwenden:
const routes = await fetchRoute(start, end, {
  mode: 'foot',
  provider: 'openrouteservice',
})
```

## 🔧 Verwendung

### Basis-Verwendung

```typescript
import { fetchRoute, formatDuration, formatDistance } from '@/utilities/routing'

const start = { lat: 51.478679, lng: 11.983885 }
const end = { lat: 51.486343, lng: 11.968871 }

const routes = await fetchRoute(start, end, {
  mode: 'foot',              // 'car' | 'bike' | 'foot'
  provider: 'openrouteservice',  // 'osrm' | 'openrouteservice' | 'graphhopper' | 'mapbox'
})

if (routes.length > 0) {
  console.log(formatDuration(routes[0].duration))  // "15 Min. 30 Sek."
  console.log(formatDistance(routes[0].distance))  // "1.2 km"
}
```

### Mit Fallback

```typescript
// Versuche OpenRouteService, falle zurück zu OSRM
let routes = await fetchRoute(start, end, {
  mode: 'foot',
  provider: 'openrouteservice',
})

if (routes.length === 0) {
  console.log('OpenRouteService failed, trying OSRM with car mode')
  routes = await fetchRoute(start, end, {
    mode: 'car',
    provider: 'osrm',
  })
}
```

### Multiple Routen gleichzeitig

```typescript
// Verschiedene Verkehrsmittel vergleichen
const [footRoute, bikeRoute, carRoute] = await Promise.all([
  fetchRoute(start, end, { mode: 'foot', provider: 'openrouteservice' }),
  fetchRoute(start, end, { mode: 'bike', provider: 'openrouteservice' }),
  fetchRoute(start, end, { mode: 'car', provider: 'osrm' }),
])
```

## 📊 API Vergleich

| Provider | Kostenlos | Fußgänger | Fahrrad | Auto | ÖPNV | Setup |
|----------|-----------|-----------|---------|------|------|-------|
| **OSRM** | ✅ Unlimitiert | ⚠️ instabil | ✅ | ✅ | ❌ | Keine Keys |
| **OpenRouteService** | ✅ 2000/Tag | ✅ Sehr gut | ✅ | ✅ | ❌ | Einfach |
| **GraphHopper** | ✅ 500/Tag | ✅ Gut | ✅ | ✅ | ❌ | Einfach |
| **Google** | ✅ 40k/Monat | ✅ Sehr gut | ✅ | ✅ | ✅ **Ja!** | Mittel + Billing |
| **Mapbox** | ✅ 100k/Monat | ✅ Sehr gut | ✅ | ✅ | ❌ | Mittel |

## 🐛 Troubleshooting

### "Failed to fetch routes"

**Lösung 1:** Verwende 'car' statt 'foot' mit OSRM
```typescript
mode: 'car'
```

**Lösung 2:** Wechsle zu OpenRouteService
```typescript
provider: 'openrouteservice'
```

### "API key not found"

Stelle sicher, dass die Umgebungsvariable gesetzt ist:
```bash
# .env.local
NEXT_PUBLIC_ORS_API_KEY=dein-key
```

Starte dann den Dev-Server neu:
```bash
pnpm dev
```

### Zu lange Wartezeit

Verwende einen schnelleren Provider:
```typescript
provider: 'osrm'  // Am schnellsten
```

## 🎯 Meine Empfehlung

### Für Events mit Fußgänger-Routing

1. **Primary:** Google (beste Qualität + ÖPNV falls benötigt)
2. **Fallback 1:** OpenRouteService (sehr gut, einfach)
3. **Fallback 2:** OSRM mit Auto-Modus (immer verfügbar)

### Für einfaches Setup ohne Billing

1. **Primary:** OpenRouteService (beste Qualität ohne Billing)
2. **Fallback:** OSRM mit Auto-Modus (wenn ORS nicht verfügbar)

```typescript
let routes = await fetchRoute(start, end, {
  mode: 'foot',
  provider: 'openrouteservice',
})

// Fallback
if (routes.length === 0) {
  routes = await fetchRoute(start, end, {
    mode: 'car',
    provider: 'osrm',
  })
}
```

## 📝 Nächste Schritte

1. ✅ Utilities erstellt: `src/utilities/routing.ts`
2. ✅ Events-Seite aktualisiert
3. 🔲 API Key holen (OpenRouteService empfohlen)
4. 🔲 In `.env.local` eintragen
5. 🔲 Testen!

## 💡 Tipps

- **Development:** OSRM (keine Keys nötig)
- **Production:** OpenRouteService oder Mapbox (zuverlässiger)
- **Cache:** Routen cachen um API-Limits zu schonen
- **Error Handling:** Immer Fallback-Provider haben

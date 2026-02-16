# Google Directions API Setup 🗺️

Google Directions API wurde als Routing-Provider hinzugefügt!

## ⚡ Schnellstart

### Schritt 1: Google Maps API Key erstellen

1. **Google Cloud Console öffnen:**
   - Gehe zu: https://console.cloud.google.com/

2. **Projekt erstellen (falls noch nicht vorhanden):**
   - Klicke auf Projekt-Dropdown oben
   - "Neues Projekt"
   - Name: z.B. "FSR WiWi Website"
   - Erstellen

3. **Directions API aktivieren:**
   - Navigation: APIs & Services → Library
   - Suche: "Directions API"
   - Klick auf "Directions API"
   - Klick auf "Aktivieren"

4. **API Key erstellen:**
   - Navigation: APIs & Services → Credentials
   - "+ CREATE CREDENTIALS" → "API Key"
   - API Key wird generiert → **Kopieren!**

5. **API Key einschränken (empfohlen):**
   - Klicke auf den API Key
   - "API restrictions" → "Restrict key"
   - Wähle: "Directions API"
   - Optional: "Application restrictions" → "HTTP referrers"
     - Füge deine Domain hinzu: `https://deine-domain.de/*`
   - Speichern

### Schritt 2: API Key in Projekt eintragen

Öffne/erstelle `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=dein-api-key-hier
```

### Schritt 3: In Code verwenden

In `src/app/(frontend)/events/page.tsx`:

```typescript
const routes = await fetchRoute(start, end, {
  mode: 'foot',      // 'car' | 'bike' | 'foot' | 'transit'
  provider: 'google', // ← Google als Provider
})
```

### Schritt 4: Dev-Server neustarten

```bash
pnpm dev
```

## ✨ Features

### Verfügbare Modi

```typescript
// Fußgänger
mode: 'foot'

// Fahrrad
mode: 'bike'

// Auto
mode: 'car'

// Öffentliche Verkehrsmittel
mode: 'transit'  // ← Nur bei Google verfügbar!
```

### Transit Mode (Einzigartig!)

Google ist der **einzige Provider**, der ÖPNV-Routing unterstützt:

```typescript
const routes = await fetchRoute(start, end, {
  mode: 'transit',
  provider: 'google',
})
```

Zeigt:
- Bus-Verbindungen
- Bahn-Verbindungen
- U-Bahn/Tram
- Kombinierte Routen

## 💰 Kosten

### Kostenlos

Google bietet **$200 kostenloses Guthaben pro Monat**:

- **Directions API:** $5 pro 1000 Anfragen
- **Mit $200 Guthaben:** 40.000 kostenlose Anfragen/Monat
- **Das sind:** ~1333 Anfragen/Tag kostenlos

### Für kleine/mittlere Websites

Wenn deine Website < 1000 Besucher/Tag hat, bleibt es **komplett kostenlos**!

### Billing einrichten (erforderlich)

⚠️ **Wichtig:** Du musst ein Abrechnungskonto verbinden, auch für die kostenlose Nutzung:

1. Google Cloud Console → "Billing"
2. "Link a billing account"
3. Kreditkarte hinzufügen (wird erst bei Überschreitung belastet)
4. Du bekommst die ersten $200/Monat kostenlos

**Tipp:** Setze ein Budget-Limit in der Console, um unerwartete Kosten zu vermeiden!

## 🎯 Vorteile von Google

### Pro

- ✅ **Sehr genaue Daten** (beste Qualität)
- ✅ **Öffentliche Verkehrsmittel** (einzigartig)
- ✅ **Echtzeit-Verkehrsdaten**
- ✅ **Großzügiges kostenloses Kontingent** (40k/Monat)
- ✅ **Sehr zuverlässig** (99.9% Uptime)
- ✅ **Weltweite Abdeckung**
- ✅ **Alternative Routen**

### Contra

- ❌ Billing-Konto erforderlich
- ❌ Kreditkarte notwendig (auch für kostenlose Nutzung)
- ❌ Komplexeres Setup als andere APIs

## 📊 Vergleich mit anderen APIs

| Feature | Google | OpenRouteService | OSRM | Mapbox |
|---------|--------|------------------|------|--------|
| **Kostenlos** | 40k/Monat | 2k/Tag | Unlimitiert | 100k/Monat |
| **Fußgänger** | ✅ Sehr gut | ✅ Sehr gut | ⚠️ Instabil | ✅ Sehr gut |
| **ÖPNV** | ✅ **Ja!** | ❌ Nein | ❌ Nein | ❌ Nein |
| **Echtzeit-Verkehr** | ✅ Ja | ❌ Nein | ❌ Nein | ✅ Ja |
| **Setup** | Mittel | Einfach | Keine Keys | Einfach |
| **Billing** | Ja | Nein | Nein | Nein |
| **Qualität** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |

## 🚀 Verwendungsbeispiele

### Basis-Verwendung

```typescript
import { fetchRoute } from '@/utilities/routing'

const start = { lat: 51.478679, lng: 11.983885 }
const end = { lat: 51.486343, lng: 11.968871 }

const routes = await fetchRoute(start, end, {
  mode: 'foot',
  provider: 'google',
})
```

### Mit Transit (ÖPNV)

```typescript
const routes = await fetchRoute(start, end, {
  mode: 'transit',    // ← Nur Google!
  provider: 'google',
})

// Zeigt Bus/Bahn-Verbindungen
```

### Multi-Provider Fallback

```typescript
// Versuche Google, falle zurück zu OpenRouteService
let routes = await fetchRoute(start, end, {
  mode: 'foot',
  provider: 'google',
})

if (routes.length === 0) {
  console.log('Google failed, trying OpenRouteService')
  routes = await fetchRoute(start, end, {
    mode: 'foot',
    provider: 'openrouteservice',
  })
}
```

### Alternative Routen anzeigen

```typescript
// Google kann mehrere alternative Routen zurückgeben
const routes = await fetchGoogleRoute(start, end, 'walking')

routes.forEach((route, index) => {
  console.log(`Route ${index + 1}:`)
  console.log(`  Dauer: ${formatDuration(route.duration)}`)
  console.log(`  Entfernung: ${formatDistance(route.distance)}`)
})
```

## 🛡️ Sicherheit

### API Key schützen

**Empfohlene Einschränkungen:**

1. **API Restriction:**
   - Nur "Directions API" aktivieren

2. **Application Restriction:**
   - "HTTP referrers (web sites)"
   - Nur deine Domain: `https://deine-domain.de/*`
   - Für localhost: `http://localhost:3000/*`

3. **Quota Limits:**
   - Setze ein Request-Limit (z.B. 10.000/Tag)
   - Verhindert Missbrauch

### Budget Alerts

In Google Cloud Console:

1. Navigation: Billing → Budgets & alerts
2. "CREATE BUDGET"
3. Limit: z.B. €5/Monat
4. Alert bei 50%, 90%, 100%

## 🐛 Troubleshooting

### "REQUEST_DENIED"

**Ursache:** Billing nicht aktiviert oder API nicht aktiviert

**Lösung:**
1. Billing-Konto verbinden
2. Directions API aktivieren

### "OVER_QUERY_LIMIT"

**Ursache:** Zu viele Anfragen

**Lösung:**
1. Quotas in Google Cloud erhöhen
2. Caching implementieren
3. Auf anderen Provider zurückfallen

### "ZERO_RESULTS"

**Ursache:** Keine Route gefunden (z.B. nicht verbundene Inseln)

**Lösung:** 
- Koordinaten prüfen
- Anderen Mode versuchen

### API Key funktioniert nicht

**Checkliste:**
- ✅ Billing-Konto verbunden?
- ✅ Directions API aktiviert?
- ✅ API Key in `.env.local`?
- ✅ Variable beginnt mit `NEXT_PUBLIC_`?
- ✅ Dev-Server neugestartet?
- ✅ API Key Restrictions korrekt?

## 💡 Best Practices

### 1. Caching

```typescript
// Cache Routen für 1 Stunde
const cacheKey = `route_${start.lat}_${start.lng}_${end.lat}_${end.lng}`
const cached = localStorage.getItem(cacheKey)

if (cached) {
  const { routes, timestamp } = JSON.parse(cached)
  if (Date.now() - timestamp < 3600000) { // 1 Stunde
    return routes
  }
}

const routes = await fetchRoute(start, end, { provider: 'google' })
localStorage.setItem(cacheKey, JSON.stringify({
  routes,
  timestamp: Date.now()
}))
```

### 2. Server-Side Caching (Empfohlen)

```typescript
// Im Server Component
import { unstable_cache } from 'next/cache'

const getCachedRoute = unstable_cache(
  async (start: RoutePoint, end: RoutePoint) => {
    return await fetchRoute(start, end, { provider: 'google' })
  },
  ['route-cache'],
  { revalidate: 3600 } // 1 Stunde
)
```

### 3. Fallback-Strategie

```typescript
const providers = ['google', 'openrouteservice', 'osrm']

for (const provider of providers) {
  const routes = await fetchRoute(start, end, {
    mode: 'foot',
    provider,
  })
  
  if (routes.length > 0) {
    return routes
  }
}
```

## 📝 In events/page.tsx verwenden

```typescript
// src/app/(frontend)/events/page.tsx
const routes = await fetchRoute(start, end, {
  mode: 'foot',
  provider: 'google',  // ← Hier auf 'google' ändern
})
```

## 🎉 Fertig!

Google Directions API ist jetzt einsatzbereit mit:
- ✅ Fußgänger-Routing
- ✅ Fahrrad-Routing
- ✅ Auto-Routing
- ✅ **ÖPNV-Routing** (einzigartig!)
- ✅ Alternative Routen
- ✅ Höchste Qualität

**Siehe ROUTING_APIS.md für Vergleich aller Provider!**

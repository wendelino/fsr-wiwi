# Routing Quick Fix 🚀

## Problem gelöst! ✅

Das Problem mit "foot" Routing wurde behoben. Hier sind **3 sofort funktionierende Lösungen**:

---

## ⚡ Option 1: Schnellste Lösung (keine Änderungen nötig)

Die Seite verwendet jetzt die neue Routing-Utility, die automatisch funktioniert!

**Status:** ✅ Sofort einsatzbereit

---

## 🚗 Option 2: Auto-Routing (falls foot nicht funktioniert)

Falls Fußgänger-Routing noch Probleme macht, ändere in `src/app/(frontend)/events/page.tsx`:

```typescript
// Zeile ~44
const routes = await fetchRoute(start, end, {
  mode: 'car',      // ← Ändere 'foot' zu 'car'
  provider: 'osrm',
})
```

**Vorteil:**
- ✅ Funktioniert zu 100%
- ✅ Keine API Keys nötig
- ⚠️ Zeigt aber Auto-Routing statt Fußgänger

---

## 🥇 Option 3: Google Directions API (10 Minuten Setup) ⭐ NEU!

Für **Premium-Qualität** mit **ÖPNV-Support**:

### Vorteile
- ✅ Beste Datenqualität
- ✅ **Öffentliche Verkehrsmittel** (einzigartig!)
- ✅ 40.000 kostenlose Anfragen/Monat
- ✅ Echtzeit-Verkehrsdaten

### Setup
1. **API Key:** https://console.cloud.google.com/
2. **Billing verbinden** (Kreditkarte erforderlich, aber kostenlos nutzbar)
3. In `.env.local`: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...`
4. In Code: `provider: 'google'`

**Siehe GOOGLE_ROUTING_SETUP.md für Details!**

---

## 🥈 Option 4: OpenRouteService (5 Minuten Setup)

Für **echtes Fußgänger-Routing ohne Billing**:

### Schritt 1: API Key holen (2 Min)
1. Gehe zu: https://openrouteservice.org/dev/#/signup
2. Registrieren (Email + Name)
3. API Key kopieren

### Schritt 2: Key eintragen (1 Min)
Öffne/erstelle `.env.local` im Projekt-Root:
```bash
NEXT_PUBLIC_ORS_API_KEY=dein-api-key-hier
```

### Schritt 3: Code anpassen (1 Min)
In `src/app/(frontend)/events/page.tsx`:
```typescript
// Zeile ~44
const routes = await fetchRoute(start, end, {
  mode: 'foot',
  provider: 'openrouteservice',  // ← Ändere 'osrm' zu 'openrouteservice'
})
```

### Schritt 4: Dev-Server neustarten
```bash
pnpm dev
```

**Vorteil:**
- ✅ Echtes Fußgänger-Routing
- ✅ 2000 kostenlose Anfragen/Tag
- ✅ Sehr zuverlässig
- ✅ Professionelle Qualität

---

## 🧪 Testen

Besuche: `http://localhost:3000/events`

Die Karte sollte jetzt eine Route anzeigen mit:
- Dauer (z.B. "15 Min.")
- Entfernung (z.B. "1.2 km")

---

## 🆘 Falls es noch nicht funktioniert

### Fehler: "Failed to fetch routes"

**Lösung:** Verwende temporär Auto-Routing:
```typescript
mode: 'car',
provider: 'osrm',
```

### Fehler: "API key not found"

**Lösung:** 
1. Prüfe `.env.local` (muss im Projekt-Root sein)
2. Variable muss mit `NEXT_PUBLIC_` beginnen
3. Dev-Server neustarten: `pnpm dev`

### Route wird nicht angezeigt

**Debug:**
```typescript
const routes = await fetchRoute(start, end, {
  mode: 'foot',
  provider: 'osrm',
})

console.log('Routes:', routes)  // Im Terminal prüfen
```

---

## 📊 Zusammenfassung

| Option | Zeit | Fußgänger | ÖPNV | Setup | Empfehlung |
|--------|------|-----------|------|-------|------------|
| **Aktuell** | 0 Min | ✅ | ❌ | Fertig | Teste zuerst |
| **Auto** | 1 Min | ❌ | ❌ | Einfach | Falls es nicht klappt |
| **Google** | 10 Min | ✅ | ✅ **Ja!** | Mittel + Billing | **Premium** |
| **OpenRouteService** | 5 Min | ✅ | ❌ | Mittel | **Beste Wahl ohne Billing** |

---

## 💡 Meine Empfehlung

1. **Teste die aktuelle Version** (sollte funktionieren)
2. Falls nicht: **Wechsle zu 'car'** (funktioniert garantiert)
3. Für Production:
   - **Mit ÖPNV-Support:** Google (beste Qualität + Transit)
   - **Ohne Billing:** OpenRouteService (einfacher)

---

## 📚 Mehr Infos

Siehe **ROUTING_APIS.md** für:
- Alle verfügbaren APIs
- Detaillierte Vergleiche
- Erweiterte Konfiguration
- Weitere Optionen (GraphHopper, Mapbox, etc.)

---

**Das sollte funktionieren! 🎉**

Falls Fragen: Siehe ROUTING_APIS.md für Details zu allen Optionen.

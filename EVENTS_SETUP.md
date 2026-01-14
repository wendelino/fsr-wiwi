# Events & Google Calendar Integration

## Übersicht

Dieses Projekt enthält eine Events-Collection in Payload CMS und eine Google Calendar Integration, die kommende Events auf der Website anzeigt.

## Features

- **Events Collection**: Verwalte Events direkt im Payload Admin Panel
  - Titel, Beschreibung (Rich Text), Start, Ende, Ort, Slug
  - Draft-Support und Versionierung
  - Zeitstempel (createdAt, updatedAt)

- **Google Calendar Integration**: Zeige Events aus einem Google Calendar an
  - Custom React Component (kein iframe)
  - Zeigt das nächste anstehende Event prominent an
  - Liste aller kommenden Events
  - "Kalender abonnieren" Button
  - Link zu jedem Event in Google Calendar

## Setup

### 1. Google Calendar API einrichten

1. Gehe zu [Google Cloud Console](https://console.cloud.google.com/)
2. Erstelle ein neues Projekt oder wähle ein bestehendes aus
3. Aktiviere die **Google Calendar API**:
   - Navigation: APIs & Services > Library
   - Suche nach "Google Calendar API"
   - Klicke auf "Enable"
4. Erstelle einen API Key:
   - Navigation: APIs & Services > Credentials
   - Klicke auf "Create Credentials" > "API Key"
   - Kopiere den generierten API Key
5. (Optional) Beschränke den API Key:
   - Klicke auf den API Key
   - Unter "API restrictions" wähle "Restrict key"
   - Wähle nur "Google Calendar API" aus

### 2. Google Calendar ID finden

1. Öffne [Google Calendar](https://calendar.google.com/)
2. Klicke auf die Einstellungen (Zahnrad-Symbol)
3. Wähle den Kalender aus, den du anzeigen möchtest
4. Scrolle zu "Integrate calendar"
5. Kopiere die "Calendar ID" (z.B. `example@group.calendar.google.com`)

### 3. Kalender öffentlich machen

Damit die API den Kalender lesen kann, muss er öffentlich sein:

1. Google Calendar > Einstellungen > Dein Kalender
2. Unter "Access permissions" aktiviere "Make available to public"
3. Stelle sicher, dass "See all event details" aktiviert ist

### 4. Umgebungsvariablen setzen

Füge folgende Variablen zu deiner `.env.local` Datei hinzu:

```bash
# Google Calendar API
NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=dein-api-key-hier
NEXT_PUBLIC_GOOGLE_CALENDAR_ID=dein-kalender-id@group.calendar.google.com
```

**Wichtig**: Die Variablen müssen mit `NEXT_PUBLIC_` beginnen, da sie im Browser verwendet werden.

### 5. Typen generieren

Nach dem Hinzufügen der Events Collection musst du die TypeScript-Typen neu generieren:

```bash
pnpm payload generate:types
```

### 6. Migration erstellen (PostgreSQL)

Wenn du PostgreSQL verwendest, erstelle eine Migration für die neue Collection:

```bash
pnpm payload migrate:create
```

## Verwendung

### Events im Admin Panel verwalten

1. Melde dich im Payload Admin Panel an (`/admin`)
2. Navigiere zu "Events"
3. Erstelle neue Events mit allen relevanten Informationen
4. Publiziere Events oder speichere sie als Entwurf

### Events Page

Die Events-Seite ist unter `/events` verfügbar und zeigt:

- Google Calendar Events (wenn konfiguriert)
- Button zum Kalender abonnieren
- Informationen zu jedem Event (Titel, Zeit, Ort)

### Komponente in anderen Pages verwenden

Du kannst die `GoogleCalendarEvents` Komponente auch in anderen Pages verwenden:

```tsx
import { GoogleCalendarEvents } from '@/components/GoogleCalendar/next-google-cal-events'

export default function MyPage() {
  return (
    <GoogleCalendarEvents
      calendarId={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID}
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}
      maxResults={5}
      showPastEvents={false}
    />
  )
}
```

### Props

- `calendarId` (string, required): Die Google Calendar ID
- `apiKey` (string, required): Der Google Calendar API Key
- `maxResults` (number, optional): Maximale Anzahl anzuzeigender Events (Standard: 5)
- `showPastEvents` (boolean, optional): Vergangene Events anzeigen (Standard: false)

## Dateistruktur

```
src/
├── collections/
│   └── Events.ts                 # Events Collection Config
├── components/
│   └── GoogleCalendar/
│       └── next-google-cal-events.tsx  # Google Calendar Komponente
└── app/(frontend)/
    └── events/
        └── page.tsx              # Events Page
```

## Troubleshooting

### "Failed to fetch calendar events"

- Prüfe, ob die Umgebungsvariablen korrekt gesetzt sind
- Stelle sicher, dass der Kalender öffentlich ist
- Verifiziere, dass die Google Calendar API aktiviert ist
- Prüfe, ob der API Key die richtigen Berechtigungen hat

### Events werden nicht angezeigt

- Stelle sicher, dass der Kalender mindestens ein zukünftiges Event enthält
- Prüfe die Browser-Konsole auf Fehler
- Verifiziere die Calendar ID

### API Key Security

- Der API Key wird im Browser sichtbar sein (da er mit `NEXT_PUBLIC_` beginnt)
- Beschränke den Key auf die Google Calendar API
- Optional: Beschränke den Key auf deine Domain(s)
- Für sensible Daten verwende stattdessen einen Server-Side API Call

## Weiterführende Informationen

- [Google Calendar API Dokumentation](https://developers.google.com/calendar)
- [Payload CMS Collections](https://payloadcms.com/docs/configuration/collections)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

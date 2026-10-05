# AGENTS.md – fsr-wiwi-halle.de

Hinweise für Coding-Agents (und Menschen), die an dieser Website arbeiten.
Der wichtigste Teil ist das **Design-System** weiter unten. Die Referenz dafür
ist `/erstiwoche`; Startseite, Kalender, Anmeldung, Kontakt, Mitglieder
und Footer folgen ihm bereits.

## Projekt

- Next.js 15 (App Router), React 19, Tailwind 3, shadcn/ui (`components/ui`),
  Icons aus `lucide-react`. Paketmanager ist **bun**.
- `bun dev` startet lokal, `bun run build` baut. Prüfen vor jedem Commit:
  `npx tsc --noEmit -p .` (`bun run lint` ist kaputt, siehe `docs/AUDIT.md` G6).
- Events kommen aus dem CMS (`CMS_ENDPOINT`, `CMS_TOKEN`) über
  `app/_actions/event.ts`; der Typ `EventItem` steht in `app/types.d.ts`.
- Sprache der Seite und der Code-Kommentare: Deutsch. Kommentare knapp und nur,
  wo sie etwas erklären, das der Code nicht sagt.
- Daten der Ersti-Woche (Tag, Start, Guide, Sponsoren, `ERSTI_PAGE`,
  `ERSTI_PROGRAM` = `/erstiwoche#lineup`) zentral in `lib/ersti.ts`;
  Legislaturen in `lib/data.ts` (`/mitglieder` leitet auf die neueste weiter).
- Navigation und Footer-Links stehen in `lib/siteConfig.ts` bzw.
  `components/Footer.tsx`. Links aufs Ersti-Programm immer über die Konstanten.
- Seitenspezifische Teile liegen neben der Seite (z. B. `erstiwoche/lineup.tsx`),
  alles Wiederverwendbare in `components/` und `lib/`. Ungenutzten Code löschen
  statt auskommentieren.

### Zeit und Termine

- Immer Berliner Zeit über `lib/berlin.ts` (`formatBerlin`, `timeRange`,
  `berlinDateKey`, `getWeekDays`). Nie `getHours()` oder `format()` ohne Zeitzone.
- `useNow()` (`lib/use-now.ts`) liefert die Zeit erst nach dem Mount (kein
  Hydration-Mismatch). Zum Testen `?now=2026-10-06T14:20` an die URL hängen.
- Anmeldestatus, Plätze und Losverfahren nur über `lib/events.ts`
  (`seatsLabel`, `isFull`, `isLottery`, `canRegister`, `lotteryText`, …).
  Keine eigenen Status-Texte bauen.

---

## Design-System „Festival-Poster“

### Heuristiken

1. **Eine laute Fläche pro Seite.** Oben ein Hero über die volle Breite
   (Bordeaux oder Foto), darunter ruhig: weißer Grund, Karten, viel Luft.
   Höchstens ein weiteres kräftiges Band (Bordeaux-Karte oder `zinc-950`).
2. **Typografie trägt das Design.** `font-black`, enge Laufweite, große
   Versalien. Ein Wort pro Hero darf als Outline-Schrift stehen
   (z. B. „Ersti **Woche**“, „Legislatur **2026**“). Keine Verläufe auf Text.
3. **Jede Sektion startet gleich:** Eyebrow + h2 über `SectionHeading`.
   Eine `h1` pro Seite, und die sitzt im Hero.
4. **Bordeaux ist Fläche oder Akzent, nie beides gleichzeitig.** Flächen
   `bg-fsr-deep text-white`; Akzente `text-fsr`, `bg-fsr/10`, `border-fsr/40`.
   Keine weiteren Buntfarben; Rot (`destructive`) nur für „Ausgebucht“.
5. **Rundungen staffeln:** Bänder `rounded-[2rem]`, Karten `rounded-3xl`,
   Elemente in Karten `rounded-2xl`, Status/Filter/Chips `rounded-full`.
6. **Links statt Modals.** Ein Klick auf einen Termin führt immer zu
   `/kalender/[slug]` (`eventHref`). Inhalte nie in Dialogen verstecken.
7. **Status spricht Klartext und ist überall gleich:** „Anmeldung nötig ·
   12 Plätze frei“, „Anmeldung nötig – es wird gelost“, „Losverfahren“,
   „Ausgebucht“, „Läuft gerade“, „Vorbei“ – über `EventStatus` bzw. `seatsLabel`.
8. **Zeit sichtbar machen.** Heute ist vorausgewählt, „Jetzt“ markiert,
   Vergangenes abgeblendet (`opacity-55`) oder eingeklappt; Countdown nur vor
   dem Ereignis, danach Status.
9. **Mobil zuerst.** Eine Spalte, Buttons gestapelt (`flex-col sm:flex-row`),
   Tap-Ziele ≥ 40 px, kein horizontales Scrollen (Ausnahme: Laufband).
   Sticky-Leisten sitzen bei `top-[72px]` unter der Navbar.
10. **Saisonales bleibt dezent.** Die Startseite bleibt allgemein; die
    Ersti-Woche erscheint dort nur als `ErstiTeaser`, nie als eigener Hero.
11. **Nur echte Inhalte.** Keine erfundenen Fakten, Zahlen oder Zitate;
    Texte aus dem CMS oder bestehenden Seiten übernehmen.
12. **Barrierefrei.** Fokus immer sichtbar (`focus-visible:ring-2
    focus-visible:ring-fsr`, auf Dunkel `ring-white`), Deko mit `aria-hidden`,
    Alt-Texte für Inhaltsbilder, `prefers-reduced-motion` respektieren
    (`motion-reduce:animate-none`, `useReducedMotion`).
13. **Keine fremden Server ohne Zustimmung.** Karten und Instagram nur über
    `IframeConsent`; statt fremder Bilder Lucide-Icons oder Dateien in `public/`.

### Farben

| Token | Klassen | Wofür |
|---|---|---|
| Bordeaux tief | `bg-fsr-deep`, `text-fsr-deep` | Heros, primäre Buttons auf Hell, Datums-Kacheln, aktive Tabs, Avatare. Theme-unabhängig. |
| Bordeaux Akzent | `text-fsr`, `bg-fsr/10`, `border-fsr/40`, `ring-fsr` | Eyebrows, Icons, Tönungen, Hover-Rahmen. Im Dark Mode heller. |
| Bordeaux hell | `text-fsr-foreground` | Akzent auf dunklen Flächen (Eyebrow im `zinc-950`-Band). |
| Dunkel | `bg-zinc-950 text-white` | Meta-Bänder (Sitzung), Footer, Laufband (`bg-foreground`). |
| Text | `text-foreground`, `text-muted-foreground` | Fließtext, Sekundäres. Auf Dunkel `text-white/85`, `/70`, `/60`. |

### Typografie

| Rolle | Klassen |
|---|---|
| Poster-Hero `h1` | `text-[clamp(3.6rem,14vw,9rem)] font-black uppercase leading-[0.85] tracking-tighter` |
| `PageHero` `h1` | normal `text-[clamp(2.4rem,7vw,4.75rem)] font-black leading-[0.95] tracking-tight`, mit `poster` `text-[clamp(3rem,10vw,6.5rem)] uppercase` |
| Sektion `h2` | `text-4xl font-black tracking-tight md:text-5xl` (über `SectionHeading`) |
| Box-Titel | `text-2xl font-black tracking-tight` |
| Karten-Titel | `text-lg font-bold leading-tight` |
| Eyebrow | `text-sm font-bold uppercase tracking-widest text-fsr` (Fakten-Labels `text-xs`) |
| Poster-Liste | `text-3xl font-black uppercase sm:text-5xl` mit Outline-Nummer |
| Outline | `text-transparent [-webkit-text-stroke:2px_white]`; auf Hell `[-webkit-text-stroke:1.5px_hsl(var(--fsr1))]` |
| Zahlen, Uhrzeiten | `tabular-nums` |

### Layout

- Seiteninhalt in `<div className="flex flex-col gap-16 md:gap-24">`.
  Breite (`max-w-6xl px-4`) kommt aus `app/layout.tsx`.
- Volle Breite nur über `FullBleed` (bzw. die Heros). Als erstes Element
  gleicht es das `pt-8` von `<main>` aus.
- Kartenraster: `grid gap-3` oder `gap-4`, `sm:grid-cols-2 lg:grid-cols-3`.
- Inhalt + Seitenleiste: `md:grid-cols-[1fr_20rem]`, Leiste
  `md:sticky md:top-24 md:self-start`.
- Intro + Liste: `md:grid-cols-[2fr_3fr]`.
- Unvollständige letzte Reihe mittig: `flex flex-wrap justify-center` mit
  festen Breiten statt Grid (siehe `SponsorStrip`, 5 pro Reihe, mobil 3).

### Bausteine

| Komponente | Datei | Einsatz |
|---|---|---|
| `FullBleed` | `components/full-bleed.tsx` | Abschnitt über die volle Fensterbreite |
| `HomeHero` | `components/home-hero.tsx` | Startseite: Campus-Foto, „Willkommen“, optional `ErstiTeaser` |
| `ErstiHero` | `components/ersti/ersti-hero.tsx` | Kampagnen-Hero der Ersti-Woche mit Laufband |
| `Lineup`, `NowCard`, `FaqSection` | `app/(lang)/(Erstiwoche)/erstiwoche/*.tsx` | Programm mit Tagesleiste, „Jetzt / Als Nächstes“, FAQ der Ersti-Woche |
| `ErstiTeaser` | `components/ersti/ersti-teaser.tsx` | Kleiner Hinweis mit Live-Status, verlinkt aufs Programm |
| `PageHero`, `HeroLead` | `components/page-hero.tsx` | Kopf jeder Unterseite (Eyebrow, `h1`, optional Zurück-Link) |
| `SectionHeading`, `Eyebrow` | `components/section-heading.tsx` | Einstieg jeder Sektion |
| `PosterList` | `components/poster-list.tsx` | 3–5 Begriffe mit großer Schrift und Nummer |
| `MeetingCard` | `components/meeting-card.tsx` | Dunkles Band zur öffentlichen Sitzung |
| `EventHeader`, `EventNotFound` | `components/events/event-header.tsx` | `PageHero` für Termine mit Status-Chips |
| `SignupCard` | `components/events/signup-card.tsx` | Termin mit Platz-Balken und Anmelde-Button |
| `EventStatus`, `LotteryNote` | `components/events/event-status.tsx` | Status-Badges, Hinweis zum Losverfahren |
| `EventFacts`, `EventActions` | `components/events/event-*.tsx` | „Auf einen Blick“ und Buttons in der Seitenleiste |
| `EventMarkdown` | `components/events/event-markdown.tsx` | Beschreibungen aus dem CMS (Markdown, ohne HTML) |
| `SponsorStrip` | `components/ersti/sponsor-strip.tsx` | Logo-Raster, weiße Logos auf dunkler Kachel (`onDark`) |
| `GenericForm` | `components/forms/generic-form.tsx` | Jedes Formular: Karte, Lade-Spinner, Ergebnis statt Formular, „Erneut versuchen“ mit erhaltenen Eingaben |
| `ResultState` | `components/result-state.tsx` | Erfolg/Fehler nach einer Aktion: gezeichnetes Icon, Text, optionale Schritte und Buttons |
| `SignupSuccess` | `components/events/signup-result.tsx` | Erfolgsansicht nach einer Anmeldung (Schritte bis zur E-Mail-Bestätigung) |

Vor neuen Komponenten prüfen, ob es einen Baustein schon gibt. Wiederholt sich
ein Muster ein drittes Mal, wird es ein Baustein.

### Muster

- **Karte:** `rounded-3xl border bg-card p-5` (oder `p-6 sm:p-8` für Formulare).
  Getönter Kopf `bg-fsr/10 p-5`, Datums-Kachel
  `size-16 rounded-2xl bg-fsr-deep text-white` mit Wochentag + Tag.
- **Link-Kachel:** Icon in `size-11 rounded-2xl bg-fsr/10 text-fsr`, oben rechts
  `ArrowUpRight`, Hover `hover:border-fsr/40 hover:shadow-md`.
- **Buttons:** auf Hell primär `bg-fsr-deep text-white hover:bg-fsr-deep/90`,
  sekundär `variant="outline"`. Auf Bordeaux/Dunkel primär `bg-white text-fsr-deep`
  (bzw. `text-zinc-950`), sekundär `border-white/40 bg-transparent text-white hover:bg-white/10`.
  Höchstens zwei nebeneinander.
- **Chips auf Dunkel:** `rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/25`;
  aktiv `bg-white text-fsr-deep`.
- **Fakten:** `dl` mit `divide-y`; `dt` als kleine Eyebrow, `dd` `font-medium`.
  Auf Dunkel als Poster-Fakten (`MeetingCard`).
- **Hero-Deko:** zwei radiale Verläufe plus `logo_outline.png` mit
  `invert opacity-[0.07]`, immer `aria-hidden`.
- **Leerer Zustand:** `rounded-3xl border border-dashed p-10 text-center text-muted-foreground`
  mit einem Link, wie es weitergeht.
- **Bewegung sparsam:** kleine Hover-Verschiebungen (`group-hover:translate-x-0.5`),
  Puls nur für „läuft gerade“ bzw. den aktuellen Schritt. Größere Animationen nur bei
  Zustandswechseln (Formular → Erfolg/Fehler) über `motion` und immer mit
  `useReducedMotion`. Keine Einblend-Animationen, die Inhalte ohne JS verstecken.
- **Formulare und Ergebnisse:** nie nur ein Toast oder eine leere Seite. Erfolg zeigt,
  was als Nächstes passiert (Schritte, z. B. „E-Mail bestätigen“) und bietet einen
  sinnvollen nächsten Klick; Fehler zeigen die Meldung des Servers und „Erneut versuchen“.
- **Lange Wörter in Postern:** Versalien trennt der Browser nicht zuverlässig – lange
  Wörter mit `&shy;` vorbereiten (z. B. `Fachschafts&shy;rat`).

### Texte

- Ersti-Inhalte sprechen die Gruppe an („ihr/euch“), Formulare und
  Einzelaktionen die Person („du“).
- Kurz und aktiv. Gedankenstrich „–“ für Einschübe, Mittelpunkt „·“ als Trenner
  in Meta-Zeilen („Dienstag, 06.10. · 15:00–18:00 Uhr“).
- Uhrzeiten mit `timeRange` (Mitternacht als „24:00“), Datum „Dienstag, 06.10.2026“.
- Buttons sagen, was passiert: „Jetzt anmelden“, „Zur Verlosung anmelden“,
  „In meinen Kalender“, „Alle Termine in den Kalender“.
- Umami-Events: `data-umami-event="<Aktion>-<Quelle>-<slug>"`, z. B.
  `Signup-ERSTI-unilympics`.

### Checkliste

- [ ] `npx tsc --noEmit -p .` ist sauber.
- [ ] Bei 390 px und 1200 px angesehen, Dark Mode kurz geprüft.
- [ ] Neue Seite: `PageHero` + `SectionHeading` + Seiten-Wrapper.
- [ ] Termine verlinken auf `/kalender/[slug]`, Status-Texte aus `lib/events.ts`.
- [ ] Keine neuen externen Bilder/Skripte ohne `IframeConsent`.

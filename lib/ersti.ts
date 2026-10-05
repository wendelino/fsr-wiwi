import type { SponsorItem } from "@/components/SponsorGrid";
import { berlinDateKey, shiftDayKey } from "@/lib/berlin";

// Zentrale Daten der Ersti-Woche, damit Seite und Design-Entwürfe dieselben Werte nutzen
export const ERSTI_TAG = "ersti26";
export const ERSTI_START = "2026-10-05"; // Montag, Berliner Kalendertag
export const ERSTI_DAYS = 5;
export const ERSTI_GUIDE = "/files/ersti-guide-26.pdf";
// Ziel aller Links aufs Ersti-Programm; nach dem Umzug auf "/erstiwoche" umstellen
export const ERSTI_PAGE = "/erstiwoche-new";

// So viele Tage vorher zeigt die Startseite schon den Ersti-Hero
const ERSTI_SEASON_LEAD_DAYS = 21;

/** Ersti-Woche steht bevor oder läuft gerade (Berliner Kalendertage). */
export function isErstiSeason(now: Date) {
  const today = berlinDateKey(now);
  const from = shiftDayKey(ERSTI_START, -ERSTI_SEASON_LEAD_DAYS);
  const to = shiftDayKey(ERSTI_START, ERSTI_DAYS - 1);
  return today >= from && today <= to;
}

// onDark: weißes Logo, braucht dunklen Hintergrund
export type ErstiSponsor = SponsorItem & { onDark?: boolean };

export const erstiSponsors: ErstiSponsor[] = [
  {
    src: "myhealth-juicery.png",
    href: "https://myhealth-juicery.de",
    label: "MyHealth Juicery",
  },
  {
    src: "ostkarte.png",
    href: "https://ostkarte.com",
    label: "Ostkarte",
    onDark: true,
  },
  {
    src: "zetti.png",
    href: "https://www.zetti.de",
    label: "Zetti",
  },
  {
    src: "goenrgy.png",
    href: "https://goenrgy.de",
    label: "Goenrgy",
    onDark: true,
  },
  {
    src: "iwh-halle.png",
    href: "https://www.iwh-halle.de",
    label: "IWH Halle",
  },
  {
    src: "lioko-mexikaner.png",
    href: "http://www.lioko-mexikaner.de/shop",
    label: "Lioko Mexikaner",
  },
  {
    src: "kathi.png",
    href: "https://www.kathi.de",
    label: "Kathi",
  },
  {
    src: "partyfly.png",
    href: "https://www.partyfly.de",
    label: "Partyfly",
    onDark: true,
  },
  {
    src: "dak.png",
    href: "https://www.dak.de",
    label: "DAK",
  },
  {
    src: "campus-tuete.png",
    href: "https://www.campus-tuete.de",
    label: "Campus-Tüte",
    onDark: true,
  },
  {
    src: "sachsen-anhalt-kanns-halt.jpg",
    href: "https://sachsen-anhalt-kanns-halt.de",
    label: "Sachsen-Anhalt kanns halt",
  },
  {
    src: "nowherenearold.png",
    href: "https://www.instagram.com/nowherenearold/",
    label: "Nowhere Near Old",
  },
  {
    src: "sparda.jpg",
    href: "https://www.sparda-b.de/homepage.html",
    label: "Sparda-Bank Berlin",
  },
];

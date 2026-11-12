import { ERSTI_GUIDE, ERSTI_PAGE, ERSTI_PROGRAM } from "@/lib/ersti";

export const BUFAK_URL = "https://bufak.fsr-wiwi-halle.de";
export const INSTAGRAM_URL = "https://www.instagram.com/fsr.wiwi.halle/";
// Kursdetails in Stud.IP – im Gegensatz zur Übersicht auch ohne Mitgliedschaft erreichbar
export const ALTKLAUSUREN_URL =
  "https://studip.uni-halle.de/dispatch.php/course/details?sem_id=ee8c88937076ac5fe253303faf816cbe&again=yes";
export const FUNDING_URL = "https://wcms.itz.uni-halle.de/download.php?down=56894&elem=2139305";

export type NavItem = { href: string; label: string; prefetch?: boolean };
export type NavPage = NavItem | { label: string; dropdown: NavItem[] };

export const siteConfig: {
  logo: string;
  name: string;
  url: string;
  pages: NavPage[];
  company: Record<"owner" | "plz" | "ort" | "strasse" | "mail", string>;
} = {
  logo: "/logo.png",
  name: "FSR Wiwi",
  url: "https://fsr-wiwi-halle.de",
  pages: [
    { href: BUFAK_URL, label: "BuFaK" },
    {
      label: "Ersti-Woche",
      dropdown: [
        { href: ERSTI_PAGE, label: "Übersicht" },
        { href: ERSTI_PROGRAM, label: "Programm" },
        { href: "/anmeldung", label: "Anmeldung" },
        { href: ERSTI_GUIDE, label: "Ersti-Guide", prefetch: false },
      ],
    },
    { href: "/asq", label: "ASQ" },
    { href: "/kalender", label: "Kalender" },
    {
      label: "Über uns",
      dropdown: [
        { href: "/about", label: "Über uns" },
        { href: "/mitglieder", label: "Mitglieder" },
        { href: "/awareness", label: "Awareness" },
      ],
    },
    { href: "/kontakt", label: "Kontakt" },
  ],
  company: {
    owner: "Fachschaftsrat Wirtschaftswissenschaften",
    plz: "06108",
    ort: "Halle (Saale)",
    strasse: "Große Steinstraße 73",
    mail: "fachschaftsrat@wiwi.uni-halle.de",
  },
};

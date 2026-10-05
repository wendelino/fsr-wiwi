import { ERSTI_GUIDE, ERSTI_PAGE, ERSTI_PROGRAM } from "@/lib/ersti";

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
    {
      label: "Ersti-Woche",
      dropdown: [
        { href: ERSTI_PAGE, label: "Übersicht" },
        { href: ERSTI_PROGRAM, label: "Programm" },
        { href: "/anmeldung", label: "Anmeldung" },
        { href: ERSTI_GUIDE, label: "Ersti-Guide", prefetch: false },
        // { href: "/lageplan", label: "Lageplan" },
      ],
    },
    { href: "/asq", label: "ASQ" },
    { href: "/kalender", label: "Kalender" },
    {
      label: "Über uns",
      dropdown: [
        { href: "/about", label: "Über uns" },
        { href: "/mitglieder", label: "Mitglieder" },
        // { href: "/go", label: "Geschäftsordnung" },
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

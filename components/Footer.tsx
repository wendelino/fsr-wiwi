import { ERSTI_PAGE } from "@/lib/ersti";
import { siteConfig } from "@/lib/siteConfig";
import { ArrowUpRight, Instagram, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WidthWrapper from "./WidthWrapper";

const INSTAGRAM_URL = "https://www.instagram.com/fsr.wiwi.halle/";

const columns = [
  {
    title: "Entdecken",
    links: [
      { href: "/kalender", label: "Kalender" },
      { href: ERSTI_PAGE, label: "Ersti-Woche" },
      { href: "/anmeldung", label: "Anmeldung" },
      { href: "/asq", label: "ASQ" },
    ],
  },
  {
    title: "Über uns",
    links: [
      { href: "/about", label: "Über uns" },
      { href: "/mitglieder", label: "Mitglieder" },
      { href: "/awareness", label: "Awareness" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/impressum", label: "Impressum" },
    ],
  },
];

export default function Footer() {
  const { owner, mail, strasse, plz, ort } = siteConfig.company;
  return (
    <footer className="mt-24 overflow-hidden bg-zinc-950 text-white">
      <WidthWrapper className="pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8">
          <div className="col-span-2 space-y-6 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="rounded-full bg-white p-1">
                <Image src="/logo.png" alt="Logo des FSR WiWi" width={56} height={56} />
              </span>
              <span className="text-lg font-black leading-tight tracking-tight">
                FSR WiWi
                <span className="block text-sm font-medium text-white/60">MLU Halle-Wittenberg</span>
              </span>
            </Link>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a href={`mailto:${mail}`} className="flex items-start gap-2 break-all transition hover:text-white">
                  <Mail className="mt-0.5 size-4 shrink-0 text-fsr-foreground" /> {mail}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-fsr-foreground" />
                <span>
                  {strasse}
                  <br />
                  {plz} {ort}
                </span>
              </li>
            </ul>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/15"
            >
              <Instagram className="size-4" /> @fsr.wiwi.halle
              <ArrowUpRight className="size-4 text-white/60" />
            </a>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-xs font-bold uppercase tracking-widest text-fsr-foreground">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/80 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-white/50 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {owner}
          </p>
          <p>Öffentliche Sitzung jeden 2. Dienstag, 19 Uhr · Raum 201</p>
        </div>
      </WidthWrapper>

      {/* Wortmarke als Poster-Abschluss */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.18em] select-none text-center text-[clamp(4rem,15vw,13rem)] font-black uppercase leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.18)]"
      >
        FSR WiWi
      </p>
    </footer>
  );
}

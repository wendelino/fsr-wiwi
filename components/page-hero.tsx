import { FullBleed } from "@/components/full-bleed";
import { Eyebrow } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * Bordeaux-Kopf für Unterseiten (Kalender, Anmeldung, Kontakt, Mitglieder …).
 * Volle Breite, direkt unter der Navbar; Inhalt über children.
 */
export function PageHero({
  eyebrow,
  title,
  back,
  children,
  poster = false,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  back?: { href: string; label: string };
  /** Untertitel, Chips oder Buttons unter der Überschrift */
  children?: React.ReactNode;
  /** Riesige Versalien wie im Ersti-Hero statt normaler Headline */
  poster?: boolean;
  className?: string;
}) {
  return (
    <FullBleed>
      <div className={cn("relative overflow-hidden bg-fsr-deep text-white", className)}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(0,0,0,0.35),transparent_50%)]"
        />
        <img
          src="/logo_outline.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-16 hidden w-[420px] opacity-[0.07] invert md:block"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-16">
          {back && (
            <Link
              href={back.href}
              className="mb-8 inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowLeft className="size-4" /> {back.label}
            </Link>
          )}
          {eyebrow && <Eyebrow onDark>{eyebrow}</Eyebrow>}
          <h1
            className={cn(
              "mt-2 max-w-4xl font-black",
              poster
                ? "text-[clamp(3rem,10vw,6.5rem)] uppercase leading-[0.9] tracking-tighter"
                : "text-[clamp(2.4rem,7vw,4.75rem)] leading-[0.95] tracking-tight"
            )}
          >
            {title}
          </h1>
          {children && <div className="mt-6 md:mt-8">{children}</div>}
        </div>
      </div>
    </FullBleed>
  );
}

/** Untertitel im Hero. */
export function HeroLead({ children }: { children: React.ReactNode }) {
  return <p className="max-w-xl text-lg text-white/85">{children}</p>;
}

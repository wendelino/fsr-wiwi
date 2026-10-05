import { FullBleed } from "@/components/full-bleed";
import { HeroDeco } from "@/components/hero-deco";
import { Enter } from "@/components/motion";
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
        <HeroDeco />
        <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-16">
          {back && (
            <Enter className="mb-8">
              <Link
                href={back.href}
                className="group inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ArrowLeft className="size-4 transition group-hover:-translate-x-0.5" /> {back.label}
              </Link>
            </Enter>
          )}
          {eyebrow && (
            <Enter step={back ? 1 : 0}>
              <Eyebrow onDark>{eyebrow}</Eyebrow>
            </Enter>
          )}
          <Enter
            as="h1"
            variant="rise"
            step={back ? 2 : 1}
            className={cn(
              // Lange Titel (z. B. "Infoveranstaltung") auf dem Handy trennen statt überlaufen
              "mt-2 max-w-4xl hyphens-auto break-words font-black",
              poster
                ? "text-[clamp(3rem,10vw,6.5rem)] uppercase leading-[0.9] tracking-tighter"
                : "text-[clamp(2.4rem,7vw,4.75rem)] leading-[0.95] tracking-tight"
            )}
          >
            {title}
          </Enter>
          {children && (
            <Enter step={back ? 3 : 2} className="mt-6 md:mt-8">
              {children}
            </Enter>
          )}
        </div>
      </div>
    </FullBleed>
  );
}

/** Untertitel im Hero. */
export function HeroLead({ children }: { children: React.ReactNode }) {
  return <p className="max-w-xl text-lg text-white/85">{children}</p>;
}

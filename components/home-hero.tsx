import { ErstiTeaser } from "@/components/ersti/ersti-teaser";
import { FullBleed } from "@/components/full-bleed";
import { Enter, Parallax } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Allgemeiner Hero der Startseite: Campus-Foto, Begrüßung, wer wir sind.
 * Saisonales (z. B. die Ersti-Woche) nur als kleiner Teaser, nie als eigener Hero.
 */
export function HomeHero({ showErstiTeaser = false }: { showErstiTeaser?: boolean }) {
  return (
    <FullBleed>
      <div className="relative overflow-hidden bg-zinc-950 text-white">
        {/* Foto wandert beim Scrollen langsamer mit; Überstand nach unten verdeckt die Kante */}
        <Parallax offset={120} className="absolute inset-x-0 -bottom-32 top-0">
          <Image
            src="/campus.jpg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_50%] opacity-60"
          />
        </Parallax>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,hsl(350_63%_41%/0.55),transparent_55%)]"
        />
        {/* Mobil steht der Ersti-Hinweis unter den Buttons, ab md darüber */}
        <div className="relative mx-auto flex max-w-6xl flex-col px-4 py-16 md:py-28">
          <Enter as="p" className="text-sm font-bold uppercase tracking-widest text-white/70">
            Fachschaftsrat Wirtschaftswissenschaften · MLU Halle
          </Enter>
          <Enter
            as="h1"
            variant="rise"
            step={1}
            className="mt-3 text-[clamp(3.2rem,9vw,6rem)] font-black uppercase leading-[0.85] tracking-tighter"
          >
            Willkommen
          </Enter>
          <Enter as="p" step={2} className="mt-6 max-w-xl text-white/85 md:text-lg">
            Wir sind die gewählte Vertretung aller Studierenden der
            Wirtschaftswissenschaften – für eure Anliegen, Veranstaltungen und
            alles rund ums Studium.
          </Enter>
          <Enter step={3} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-zinc-950 hover:bg-white/90">
              <Link href="/kalender">
                <CalendarDays className="mr-2 size-4" /> Termine ansehen
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/about">
                Über uns <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </Enter>
          {showErstiTeaser && (
            <Enter step={4} className="mt-6 md:order-first md:mb-8 md:mt-0 md:self-start">
              <ErstiTeaser className="w-full md:w-auto" />
            </Enter>
          )}
        </div>
      </div>
    </FullBleed>
  );
}

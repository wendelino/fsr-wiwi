import { FullBleed } from "@/components/full-bleed";
import { Button } from "@/components/ui/button";
import { CalendarDays, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/** Hero der Startseite außerhalb der Ersti-Saison, im Stil des Ersti-Heros. */
export function HomeHero({ subtitle }: { subtitle: string }) {
  return (
    <FullBleed>
      <div className="relative overflow-hidden bg-fsr-deep text-white">
        <Image
          src="/campus.jpg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20 mix-blend-luminosity"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(0,0,0,0.35),transparent_50%)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[1.5fr_1fr] md:py-24">
          <div>
            <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/25 backdrop-blur">
              MLU Halle-Wittenberg
            </span>
            <h1 className="mt-6 text-[clamp(3.6rem,14vw,9rem)] font-black uppercase leading-[0.85] tracking-tighter">
              FSR
              <br />
              <span className="text-transparent [-webkit-text-stroke:2px_white]">WiWi</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/85">{subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-fsr-deep hover:bg-white/90">
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
                <Link href="/kontakt">
                  <MessageCircle className="mr-2 size-4" /> Schreib uns
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden justify-center md:flex">
            <div className="-rotate-6 rounded-full bg-white p-3 shadow-[0_25px_50px_rgba(0,0,0,0.35)]">
              <Image src="/logo.png" alt="Logo des FSR WiWi" width={340} height={340} priority />
            </div>
          </div>
        </div>
      </div>
    </FullBleed>
  );
}

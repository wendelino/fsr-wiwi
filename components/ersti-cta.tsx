"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

type ErstiWocheCTAProps = {
  className?: string;
};

export function ErstiWocheCTA({ className }: ErstiWocheCTAProps) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border",
        "bg-gradient-to-br from-primary/10 via-background to-background",
        "p-6 md:p-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
   >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />

      <div className="relative flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Alles zur Ersti‑Woche 2025
          </h2>
          <p className="text-muted-foreground">
            Lerne Uni und Stadt kennen, finde neue Freundschaften und starte entspannt ins Studium.
            Schau ins Programm, such dir deine Highlights aus und sei dabei!
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <Button asChild size="lg" data-umami-event="E-CTA-Programm">
            <Link href="/erstiwoche#programm">Zum Programm</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" data-umami-event="E-CTA-MehrInfos">
            <Link href="/erstiwoche">Mehr Infos</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErstiWocheCTA;



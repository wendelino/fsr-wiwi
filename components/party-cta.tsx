"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type PartyCTAProps = {
  className?: string;
};

export default function PartyCTA({ className }: PartyCTAProps) {
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
            Beste Semester-Opening Party - Samstag, 11.10
          </h2>
          <p className="text-muted-foreground">
            Drei Floors, 10 Artists, die euch bis 5 Uhr mit feinsten Klängen
            durch die Nacht tragen. 📍Charles Bronson 🎟️ Erstis mit Bändchen: 5€
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <Button asChild size="lg" data-umami-event="E-CTA-Erstiparty">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://eventfrog.de/de/p/party/studentenparty/semester-opening-party-7372976779638605368.html"
            >
              Ticket kaufen <ArrowRight  className="size-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

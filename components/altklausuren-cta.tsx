"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";

type AltklausurenCTAProps = {
  className?: string;
};

export default function AltklausurenCTA({ className }: AltklausurenCTAProps) {
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
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Auf der Suche nach Altklausuren?
            </h2>
          </div>
          <p className="text-muted-foreground">
            Auf Studip unter <strong>Fachschaftsrat Wirtschaftwissenschaften (FSR WiWi) / Econ Students Council</strong> findest du unsere Sammlung an
            Altklausuren.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <Button asChild size="lg" data-umami-event="E-CTA-Altklausuren">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://studip.uni-halle.de/dispatch.php/course/overview?cid=ee8c88937076ac5fe253303faf816cbe"
            >
              Zu StudIP <ArrowRight className="size-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Stagger, StaggerItem } from "@/components/motion";
import { ErstiSponsor } from "@/lib/ersti";
import { cn } from "@/lib/utils";
import Image from "next/image";

/** Logo-Raster mit 5 pro Reihe (mobil 3); weiße Logos (onDark) bekommen eine dunkle Kachel. */
export function SponsorStrip({
  sponsors,
  className,
  tileClassName,
}: {
  sponsors: ErstiSponsor[];
  className?: string;
  tileClassName?: string;
}) {
  return (
    // Flex statt Grid, damit eine unvollständige letzte Reihe mittig steht
    <Stagger as="ul" step={0.04} className={cn("flex flex-wrap justify-center gap-3", className)}>
      {sponsors.map((s) => (
        <StaggerItem
          as="li"
          variant="scale"
          key={s.label}
          className="w-[calc((100%_-_1.5rem)/3)] sm:w-[calc((100%_-_3rem)/5)]"
        >
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
            className={cn(
              "flex h-20 items-center justify-center rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr",
              s.onDark ? "bg-zinc-900 border-zinc-800" : "bg-white",
              tileClassName
            )}
          >
            <span className="relative h-full w-full">
              <Image
                src={`/sponsoring/${s.src}`}
                alt={s.label}
                fill
                sizes="(min-width: 640px) 220px, 33vw"
                className="object-contain"
              />
            </span>
          </a>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

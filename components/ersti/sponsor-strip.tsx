import { ErstiSponsor } from "@/lib/ersti";
import { cn } from "@/lib/utils";
import Image from "next/image";

/** Kompakte Logo-Leiste; weiße Logos (onDark) bekommen eine dunkle Kachel. */
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
    <ul
      className={cn(
        "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3",
        className
      )}
    >
      {sponsors.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
            className={cn(
              "flex h-16 items-center justify-center rounded-xl border p-3 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr",
              s.onDark ? "bg-zinc-900 border-zinc-800" : "bg-white",
              tileClassName
            )}
          >
            <span className="relative h-full w-full">
              <Image
                src={`/sponsoring/${s.src}`}
                alt={s.label}
                fill
                sizes="160px"
                className="object-contain"
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

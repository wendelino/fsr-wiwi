import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type PosterItem = { icon: LucideIcon; title: string; text: string };

/** Nummerierte Liste mit großen Schlagworten, wie auf einem Festival-Poster. */
export function PosterList({ items, className }: { items: PosterItem[]; className?: string }) {
  return (
    <ol className={cn("border-b", className)}>
      {items.map(({ icon: Icon, title, text }, i) => (
        <li
          key={title}
          className="grid grid-cols-[2.5rem_1fr] items-center gap-x-4 border-t py-5 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-6"
        >
          <span
            aria-hidden
            className="text-2xl font-black tabular-nums text-transparent [-webkit-text-stroke:1.5px_hsl(var(--fsr1))] sm:text-4xl"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h3 className="hyphens-auto break-words text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">{text}</p>
          </div>
          <span className="hidden size-14 items-center justify-center rounded-full bg-fsr/10 text-fsr sm:flex">
            <Icon className="size-6" />
          </span>
        </li>
      ))}
    </ol>
  );
}

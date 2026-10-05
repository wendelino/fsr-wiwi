import { cn } from "@/lib/utils";

/** Langer Fließtext (Impressum, Datenschutz, Ordnungen): h2/h3, Listen und Links ohne eigene Klassen. */
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <article
      className={cn(
        "max-w-3xl space-y-4 text-lg leading-relaxed text-foreground/80",
        "[&_h2]:pt-8 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-foreground",
        "[&_h3]:pt-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground",
        "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-fsr",
        "[&_a]:font-medium [&_a]:text-fsr [&_a]:underline [&_a]:underline-offset-4",
        className
      )}
    >
      {children}
    </article>
  );
}

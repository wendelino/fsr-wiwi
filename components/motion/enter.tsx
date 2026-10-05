import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tag = "div" | "span" | "p" | "h1" | "ul" | "nav";

const animations = {
  /** leicht von unten */
  up: "animate-fade-up",
  /** Poster-Überschrift: steigt hinter einer Kante hervor */
  rise: "animate-rise",
  /** Logo/Badge: kleiner Dreh-Pop */
  pop: "animate-pop-in",
};

/**
 * Einstieg für Inhalte ganz oben (Heros) per CSS: läuft sofort beim Laden,
 * auch vor der Hydration und ohne JS. `step` staffelt die Elemente.
 */
export function Enter({
  as: Comp = "div",
  variant = "up",
  step = 0,
  className,
  children,
}: {
  as?: Tag;
  variant?: keyof typeof animations;
  step?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Comp
      className={cn(animations[variant], "motion-reduce:animate-none", className)}
      style={{ animationDelay: `${60 + step * 90}ms` }}
    >
      {children}
    </Comp>
  );
}

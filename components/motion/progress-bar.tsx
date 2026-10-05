"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { type RevealTrigger, useReveal } from "./hooks";
import { EASE_OUT } from "./presets";

/** Balken, der sich beim Erscheinen bis `value` füllt (Plätze, Fortschritt eines Termins). */
export function ProgressBar({
  value,
  trigger,
  className,
  barClassName,
}: {
  /** 0–100 */
  value: number;
  trigger?: RevealTrigger;
  className?: string;
  barClassName?: string;
}) {
  const reveal = useReveal<HTMLDivElement>(trigger);
  const width = `${Math.max(0, Math.min(100, value))}%`;
  return (
    <div ref={reveal.ref} className={cn("h-2 overflow-hidden rounded-full bg-muted", className)}>
      <motion.div
        className={cn("h-full rounded-full bg-fsr-deep", barClassName)}
        // Als Objekt statt Variante, damit sich ändernde Werte (Live-Fortschritt) nachziehen
        initial={reveal.initial === false ? false : { width: "0%" }}
        animate={reveal.animate === "visible" ? { width } : { width: "0%" }}
        transition={reveal.animate === "visible" ? { duration: 0.9, ease: EASE_OUT, delay: 0.15 } : { duration: 0 }}
      />
    </div>
  );
}

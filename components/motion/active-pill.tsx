"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { SPRING } from "./presets";

/**
 * Hintergrund des aktiven Elements, der beim Wechsel zum neuen Element gleitet
 * (Tagesleiste, Navigation). Im aktiven Element rendern; das braucht `relative isolate`.
 */
export function ActivePill({ id, className }: { id: string; className?: string }) {
  return (
    <motion.span
      aria-hidden
      layoutId={id}
      transition={SPRING}
      className={cn("absolute inset-0 -z-10", className)}
    />
  );
}

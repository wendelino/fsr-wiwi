"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_OUT } from "./presets";

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 28, y: dir ? 0 : 10 }),
  center: { opacity: 1, x: 0, y: 0, transition: { duration: 0.32, ease: EASE_OUT } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -28, y: dir ? 0 : -10, transition: { duration: DURATION.fast } }),
};

/**
 * Tauscht Inhalt mit kurzer Überblendung, sobald sich `swapKey` ändert
 * (Formular → Ergebnis, Tageswechsel). Der erste Render ist nie animiert.
 */
export function Swap({
  swapKey,
  direction = 0,
  className,
  children,
}: {
  swapKey: string;
  /** -1 von links, 1 von rechts, 0 von unten */
  direction?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={swapKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

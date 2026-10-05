"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useClientMount } from "./hooks";
import { DURATION, EASE_OUT } from "./presets";

/**
 * Klappt Inhalt in der Höhe auf und zu (eingeklappte Termine, neue Formularzeilen).
 * Erst im Browser hinzugekommene Inhalte klappen beim Erscheinen auf.
 */
export function Collapse({
  show = true,
  className,
  children,
}: {
  show?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const clientMount = useClientMount();
  return (
    <AnimatePresence initial={clientMount}>
      {show && (
        <motion.div
          // overflow nur während der Animation, sonst würden Fokusringe abgeschnitten
          initial={{ height: 0, opacity: 0, overflow: "hidden" }}
          animate={{
            height: "auto",
            opacity: 1,
            transition: { duration: 0.35, ease: EASE_OUT },
            transitionEnd: { overflow: "visible" },
          }}
          exit={{ height: 0, opacity: 0, overflow: "hidden", transition: { duration: DURATION.fast } }}
        >
          {/* Abstände innen, damit die Höhe sauber auf 0 geht */}
          <div className={className}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

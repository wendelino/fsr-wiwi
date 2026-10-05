"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_OUT } from "./presets";

const variants = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  /** Dropdowns: fällt leicht nach unten */
  drop: { hidden: { opacity: 0, y: -6, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1 } },
  /** Kleine Buttons, Badges */
  pop: { hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1 } },
  /** Vollflächiges Menü: rollt von oben aus wie ein Poster */
  sheet: { hidden: { clipPath: "inset(0 0 100% 0)" }, visible: { clipPath: "inset(0 0 0% 0)" } },
};

/** Ein- und Ausblenden bedingter Inhalte (Menüs, Buttons); nur nach Nutzeraktion, nie beim Laden. */
export function Appear({
  show,
  variant = "fade",
  id,
  className,
  children,
}: {
  show: boolean;
  variant?: keyof typeof variants;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          id={id}
          className={className}
          variants={variants[variant]}
          initial="hidden"
          animate="visible"
          // Ausblenden schneller als Einblenden
          exit={{ ...variants[variant].hidden, transition: { duration: DURATION.fast } }}
          transition={{ duration: variant === "sheet" ? 0.45 : 0.22, ease: EASE_OUT }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

/** Verschiebt (und dreht) Deko langsamer als die Seite scrollt. Nur für Elemente oben auf der Seite. */
export function Parallax({
  offset = 80,
  rotate = 0,
  className,
  children,
}: {
  /** Verschiebung in px nach 800 px Scrollen; negativ = nach oben */
  offset?: number;
  /** Drehung in Grad nach 800 px Scrollen */
  rotate?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, offset]);
  const r = useTransform(scrollY, [0, 800], [0, rotate]);
  return (
    <motion.div className={className} style={reduce ? undefined : { y, rotate: r }}>
      {children}
    </motion.div>
  );
}

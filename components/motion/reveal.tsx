"use client";

import { motion } from "motion/react";
import type { AriaRole, CSSProperties, ReactNode } from "react";
import { type RevealTrigger, useReveal } from "./hooks";
import { STAGGER, revealVariants, type RevealVariant } from "./presets";

type Tag = "div" | "section" | "article" | "aside" | "header" | "ul" | "ol" | "li" | "p" | "dl" | "nav";

type BaseProps = {
  as?: Tag;
  className?: string;
  style?: CSSProperties;
  id?: string;
  role?: AriaRole;
  "aria-label"?: string;
  children?: ReactNode;
};

// Alle Tags teilen sich dieselbe Prop-Signatur (inkl. Ref), für TS reicht motion.div
const tagOf = (as: Tag) => motion[as] as typeof motion.div;

/** Blendet ein Element beim Hineinscrollen ein (vom Server Gerendertes bleibt ohne JS sichtbar). */
export function Reveal({
  as = "div",
  variant = "up",
  delay = 0,
  trigger,
  ...props
}: BaseProps & {
  variant?: RevealVariant;
  /** Sekunden */
  delay?: number;
  trigger?: RevealTrigger;
}) {
  const Comp = tagOf(as);
  const reveal = useReveal(trigger);
  return <Comp {...props} {...reveal} variants={revealVariants[variant]} custom={delay} />;
}

/** Container, dessen StaggerItems nacheinander erscheinen (Kartenraster, Listen). */
export function Stagger({
  as = "div",
  step = STAGGER,
  delay = 0,
  trigger,
  ...props
}: BaseProps & {
  /** Abstand zwischen den Elementen in Sekunden */
  step?: number;
  delay?: number;
  trigger?: RevealTrigger;
}) {
  const Comp = tagOf(as);
  const reveal = useReveal(trigger);
  return (
    <Comp
      {...props}
      {...reveal}
      variants={{
        hidden: { transition: { duration: 0 } },
        visible: { transition: { delayChildren: delay, staggerChildren: step } },
      }}
    />
  );
}

/** Kind eines Stagger; übernimmt dessen Zustand. */
export function StaggerItem({ as = "div", variant = "up", ...props }: BaseProps & { variant?: RevealVariant }) {
  const Comp = tagOf(as);
  return <Comp {...props} variants={revealVariants[variant]} />;
}

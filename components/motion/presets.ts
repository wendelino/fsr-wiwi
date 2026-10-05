import type { Transition, Variants } from "motion/react";

/** Gemeinsame Kurve und Dauern: schnell raus, weich auslaufen. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = { fast: 0.18, base: 0.5, slow: 0.8 } as const;

/** Abstand zwischen Elementen in einer Stagger-Liste. */
export const STAGGER = 0.07;

export const SPRING: Transition = { type: "spring", bounce: 0.18, duration: 0.45 };

// "hidden" wird immer sofort gesetzt – das passiert nur außerhalb des Sichtfelds
const instant = { duration: 0 };

// Ohne eigenes delay, sonst überschreibt es den Versatz von Stagger
const show = (delay = 0): Transition =>
  delay ? { duration: DURATION.base, ease: EASE_OUT, delay } : { duration: DURATION.base, ease: EASE_OUT };

/** Varianten für Reveal und StaggerItem; custom = Verzögerung in Sekunden. */
export const revealVariants = {
  up: {
    hidden: { opacity: 0, y: 18, transition: instant },
    visible: (delay = 0) => ({ opacity: 1, y: 0, transition: show(delay) }),
  },
  fade: {
    hidden: { opacity: 0, transition: instant },
    visible: (delay = 0) => ({ opacity: 1, transition: show(delay) }),
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96, y: 8, transition: instant },
    visible: (delay = 0) => ({ opacity: 1, scale: 1, y: 0, transition: show(delay) }),
  },
  left: {
    hidden: { opacity: 0, x: -20, transition: instant },
    visible: (delay = 0) => ({ opacity: 1, x: 0, transition: show(delay) }),
  },
  right: {
    hidden: { opacity: 0, x: 20, transition: instant },
    visible: (delay = 0) => ({ opacity: 1, x: 0, transition: show(delay) }),
  },
} satisfies Record<string, Variants>;

export type RevealVariant = keyof typeof revealVariants;

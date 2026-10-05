"use client";

import { MotionConfig } from "motion/react";

/** Bei "Bewegung reduzieren" lässt motion Transforms und Layout-Animationen weg. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

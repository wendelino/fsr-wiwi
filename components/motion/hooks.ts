"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * true, wenn die Komponente erst im Browser entstanden ist (Client-Navigation,
 * geöffnetes Menü …), false für alles, was der Server schon gerendert hat.
 * Nur Ersteres darf unsichtbar starten – sonst fehlt Inhalt ohne JS.
 */
export function useClientMount() {
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [atMount] = useState(hydrated);
  return atMount;
}

/** scroll: beim Hineinscrollen. mount: sobald im Browser eingeblendet (z. B. Menü). */
export type RevealTrigger = "scroll" | "mount";

/**
 * Props für ein motion-Element mit den Zuständen "hidden"/"visible".
 * Vom Server gerenderte Inhalte bleiben sichtbar; versteckt wird nur, was beim
 * Laden unterhalb des Fensters liegt, und erst nach der Hydration.
 */
export function useReveal<T extends Element = HTMLDivElement>(trigger: RevealTrigger = "scroll") {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();
  const clientMount = useClientMount();
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const [armed, setArmed] = useState(false);

  useLayoutEffect(() => {
    if (reduce || clientMount || trigger !== "scroll" || !ref.current) return;
    // Vor dem ersten Paint: nur was noch nicht zu sehen ist, wartet aufs Scrollen
    if (ref.current.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, [reduce, clientMount, trigger]);

  if (reduce) return { ref, initial: false, animate: "visible" } as const;
  if (trigger === "mount") return { ref, initial: clientMount ? "hidden" : false, animate: "visible" } as const;
  if (clientMount) return { ref, initial: "hidden", animate: inView ? "visible" : "hidden" } as const;
  return { ref, initial: false, animate: armed && !inView ? "hidden" : "visible" } as const;
}

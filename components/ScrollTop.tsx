"use client";

import { Appear } from "@/components/motion";
import { ArrowUp } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

/** Nach-oben-Button ab 400 px; der Ring zeigt, wie weit man die Seite gelesen hat. */
export default function ScrollTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 400));

  return (
    <Appear show={visible} variant="pop" className="fixed bottom-4 right-4 z-[4]">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Nach oben scrollen"
        className="group relative flex size-12 items-center justify-center rounded-full bg-fsr-deep text-white shadow-lg transition hover:bg-fsr-deep/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr focus-visible:ring-offset-2"
      >
        <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 size-12 -rotate-90">
          <circle cx="24" cy="24" r="21" fill="none" strokeWidth="2.5" className="stroke-white/20" />
          <motion.circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="stroke-white"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>
        <ArrowUp className="size-5 transition group-hover:-translate-y-0.5" />
      </button>
    </Appear>
  );
}

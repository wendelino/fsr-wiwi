"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "./ui/use-toast";

interface AltchaProps {
  onStateChange?: (ev: Event | CustomEvent) => void;
  onVerified?: () => void;
}

const ENDPOINT = "/api/altcha";

const Altcha = ({ onStateChange, onVerified }: AltchaProps) => {
  const widgetRef = useRef<HTMLElement>(null);

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const loadAltcha = async () => {
      if (typeof window === "undefined") return;
      try {
        await Promise.all([import("altcha"), import("altcha/i18n/de")]);

        if (isMounted) setIsReady(true);
      } catch (err) {
        // Silently fail; widget will not render if script fails
        if (isMounted) setIsReady(false);
      }
    };
    loadAltcha();
    return () => {
      isMounted = false;
    };
  }, []);

//   const handleStateChange = async (ev: Event | CustomEvent) => {
//     return;

//     if (!("detail" in ev)) return;
//     const detail = (ev as CustomEvent).detail;
//     const payload = detail?.payload;
//     onStateChange?.(ev);

//     if (!payload) return;
//     const res = await fetch("/api/altcha", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ payload }),
//     });
//     const json = await res.json().catch(() => ({}));
//     if (!res.ok) {
//       toast({
//         title: "Überprüfung fehlgeschlagen",
//         description: json?.message || JSON.stringify(json),
//         variant: "destructive",
//       });
//       (widgetRef.current as unknown as { reset(): void })?.reset?.();

//       return;
//     }
//     onVerified?.();
//     return false;
//   };

  if (!isReady) return null;

  const CONFIG = {
    label: "Ich bin kein Bot",
    verifying: "Kurz abchecken ob du kein Bot bist...",
    verified: "Erfolgreich verifiziert.",
  }
  return (
    <altcha-widget
      ref={widgetRef}
      style={{
        "--altcha-max-width": "320px",
        "--altcha-border-width": "1px",
        "--altcha-border-radius": "8px",
        "--altcha-color-base": "hsl(var(--background))",
        "--altcha-color-border": "hsl(var(--muted-foreground))",
        "--altcha-color-text": "currentColor",
        "--altcha-color-border-focus": "currentColor",
        "--altcha-color-error-text": "hsl(var(--destructive))",
      }}
      challengeurl={ENDPOINT}
      verifyurl={ENDPOINT}
      //   onstatechange={handleStateChange}

      floating
      delay={500}
      expire={120000}
      //   onverified={handleStateChange}
      //   auto="onsubmit"
      //   debug
      strings={JSON.stringify(CONFIG)}
    ></altcha-widget>
  );
};

export default Altcha;

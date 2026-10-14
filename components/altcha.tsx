"use client";
import { useEffect, useState } from "react";

const ENDPOINT = "/api/altcha";

const Altcha = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const loadAltcha = async () => {
      if (typeof window === "undefined") return;
      try {
        await Promise.all([import("altcha"), import("altcha/i18n/de")]);

        if (isMounted) setIsReady(true);
      } catch (err) {
        if (isMounted) setIsReady(false);
      }
    };
    loadAltcha();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isReady) return null;

  const CONFIG = {
    label: "Ich bin kein Bot",
    verifying: "Kurz abchecken ob du kein Bot bist...",
    verified: "Erfolgreich verifiziert.",
  };
  return (
    <altcha-widget
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
      floating
      delay={500}
      expire={120000}
      strings={JSON.stringify(CONFIG)}
    ></altcha-widget>
  );
};

export default Altcha;

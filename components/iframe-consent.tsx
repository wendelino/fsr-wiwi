"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Swap } from "@/components/motion";

type IframeProps = {
  iframe: {
    src: string;
    className?: string;
  };
  label: string;
  disclaimerText?: string;
  providerLink: string;
};

export default function IframeConsent({
  iframe,
  label,
  disclaimerText = "",
  providerLink,
}: IframeProps) {
  const LOCAL_STORAGE_KEY =
    "iframeConsent_" + label.replace(/\s+/g, "_").toLowerCase();

  const [consentGiven, setConsentGiven] = useState(false);
  const [rememberChoice, setRememberChoice] = useState(true);

  useEffect(() => {
    const savedConsent = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedConsent === "true") {
      setConsentGiven(true);
    }
  }, []);

  const handleAccept = () => {
    if (rememberChoice) {
      localStorage.setItem(LOCAL_STORAGE_KEY, "true");
    }
    setConsentGiven(true);
  };

  const style = cn("w-full min-h-72 rounded-xl", iframe.className);

  const placeholder = (
    <div className={cn(style, "flex flex-col items-center justify-center bg-muted p-8")}>
      <p className="mb-4 text-lg font-semibold">Externe Inhalte von {label}</p>
      <p className="text-center text-muted-foreground">
        {disclaimerText}
        <br /> Weitere Infos beim Anbieter{" "}
        <Link href={providerLink} target="_blank" rel="noopener noreferrer" className="underline">
          {label}
        </Link>
        .
      </p>
      <Button
        className="mt-8 bg-fsr-deep text-white hover:bg-fsr-deep/90"
        onClick={handleAccept}
        data-umami-event="IframeConsent-Accept"
      >
        Externe Inhalte laden
      </Button>
      <label className="mt-2 flex items-center space-x-2">
        <Checkbox checked={rememberChoice} onCheckedChange={(checked: boolean) => setRememberChoice(checked)} />
        <span className="text-sm">Entscheidung merken</span>
      </label>
    </div>
  );

  return (
    // Nach der Zustimmung blendet der Platzhalter in den Inhalt über
    <Swap swapKey={consentGiven ? "iframe" : "consent"} className="h-full">
      {consentGiven ? (
        <iframe src={iframe.src} className={style} loading="lazy" scrolling="no" />
      ) : (
        placeholder
      )}
    </Swap>
  );
}

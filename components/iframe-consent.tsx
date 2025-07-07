"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { cn } from "@/lib/utils";

type IframeProps = {
  iframe: {
    src: string;
    className?: string;
  };
  label: string;
  disclaimerText: string;
  providerLink: string;
};

export default function IframeConsent({
  iframe,
  label,
  disclaimerText,
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

  const style = cn("w-full min-h-96 rounded-xl", iframe.className);

  if (consentGiven) {
    return (
      <iframe
        src={iframe.src}
        className={style}
        loading="lazy"
        scrolling="no"
      />
    );
  }

  return (
    <div
      className={cn(
        style,
        "flex flex-col  bg-muted items-center justify-center p-8 "
      )}
    >
        <h1 className="text-lg font-semibold mb-4">Externe Inhalte von {label}</h1>
      <p className="text-center text-muted-foreground">
        {disclaimerText}<br></br> Weitere Infos beim Anbieter{" "}
        <Link
          href={providerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {label}
        </Link>
      </p>

      <Button className="mt-8"  onClick={handleAccept}>Externe Inhalte laden</Button>
      <label className="flex items-center space-x-2 mt-2">
        <Checkbox
          checked={rememberChoice}
          onCheckedChange={(checked: boolean) => setRememberChoice(checked)}
        />
        <span className="text-sm">Entscheidung merken</span>
      </label>
    </div>
  );
}

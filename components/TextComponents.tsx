"use client"
import { cn } from "@/lib/utils";
import { useState, useEffect } from 'react';

export function Header({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div 
      className={cn(
        "font-bold text-3xl py-8 lg:text-5xl lg:py-16",
         className
      )}
    >
      {children}
    </div>
  );
}

export function AnimatedText({text}: {text: string}) {
  const [displayedText, setDisplayedText] = useState(text[0]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex += 1;
      } else {
        clearInterval(interval);
      }
    }, 150); // Intervall in Millisekunden

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
}


export function AnimatedEvents({events}: {events: any[]}) {

  const [currentEvent, setCurrentEvent] = useState(events[0].label); // Initiale Veranstaltung

  useEffect(() => {
    // Index für die aktuelle Veranstaltung
    let eventIndex = 0;

    const intervalId = setInterval(() => {
      eventIndex = (eventIndex + 1) % events.length; // Nächsten Index, Loop zurück zum Anfang
      setCurrentEvent(events[eventIndex].label);
    }, 2500); // Alle 3 Sekunden

    // Aufräumarbeiten, um den Interval-Handler zu stoppen, wenn die Komponente unmontiert wird
    return () => clearInterval(intervalId);
  }, [events]);

    return (
      <AnimatedText text={currentEvent}/>
    );
}
"use client"
import { cn } from "@/lib/utils";
import { Event_DB } from "@prisma/client";
import { useState, useEffect } from 'react';
import { EventProps } from "./Event";

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

export function SubHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div 
      className={cn(
        "font-bold text-lg py-4 lg:text-2xl",
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
        setDisplayedText(text.substring(0, currentIndex + 1) + "|");
        currentIndex += 1;
      } else {
        clearInterval(interval);
        setDisplayedText(text)
      }
    }, 150); // Intervall in Millisekunden

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
}


export function AnimatedEvents({events}: {events: EventProps[]}) {

  const [currentEvent, setCurrentEvent] = useState(events[0].title); // Initiale Veranstaltung

  useEffect(() => {
    // Index für die aktuelle Veranstaltung
    let eventIndex = 0;

    const intervalId = setInterval(() => {
      eventIndex = (eventIndex + 1) % events.length; // Nächsten Index, Loop zurück zum Anfang
      setCurrentEvent(events[eventIndex].title);
    }, 2500); // Alle 3 Sekunden

    // Aufräumarbeiten, um den Interval-Handler zu stoppen, wenn die Komponente unmontiert wird
    return () => clearInterval(intervalId);
  }, [events]);

    return (
      <AnimatedText text={currentEvent}/>
    );
}
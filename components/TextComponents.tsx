"use client"
import { cn } from "@/lib/utils"; 
import { useState, useEffect } from 'react';
import { EventProps } from "./Event";
import { TypeAnimation } from "react-type-animation";
import { setTimeout } from "timers/promises";


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
        "font-bold text-3xl py-8 md:text-5xl md:py-16",
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
        "font-bold text-lg py-4 md:text-2xl",
         className
      )}
    >
      {children}
    </div>
  );
}

export function AnimatedText({text, className}: {text: string, className?: string}) {
  return   <TypeAnimation
  sequence={[
    text
  ]} 
  wrapper="span"
  speed={20}
  repeat={1}
  className={className}
/>
}


export function AnimatedEvents({events}: {events: EventProps[]}) {
 

  const [currentEvent, setCurrentEvent] = useState(events[0]?.title || ""); // Initiale Veranstaltung

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
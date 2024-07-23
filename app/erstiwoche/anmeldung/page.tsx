
"use client"
import { RegisterForm } from "@/components/RegisterForm";
import { AnimatedEvents, AnimatedText, Header } from "@/components/TextComponents";
import { useEffect, useState } from "react";

export default function page() {

  const events = [
    {label: "Veranstaltung"},
    {label: "Speedmeeting"},
    {label: "Stadtrallye"},
    {label: "Ersti-Party"}
  ]

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
    <div className="flex flex-col items-center">
      <Header>Bei <span className="fsr-gradient"> <AnimatedEvents events={events} />  </span> anmelden</Header>
      <RegisterForm />
    </div>
  );
}

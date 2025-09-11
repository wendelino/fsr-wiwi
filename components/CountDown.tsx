"use client";
import { Dot } from "lucide-react";
import { useState, useEffect } from "react";

export default function Countdown() { 
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-10-06T00:00:00").getTime(); // Ziel-Datum als Zeitstempel
    const now = new Date().getTime(); // Aktuelles Datum als Zeitstempel
    const difference = targetDate - now;

    let timeLeft: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    } = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,  
    hours: 0,
    minutes: 0,
    seconds: 0,
});

  useEffect(() => { 
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
 

  return (
    <div className="font-bold  text-2xl flex flex-col gap-6 p-4 bg-secondary rounded-xl items-center my-8 shadow-lg">
        Start der Erstiwoche
      <div className="font-semibold sm:text-3xl text-xl flex flex-wrap  gap-1  ">
        <TimeDisplay label="Tage" value={timeLeft.days} /> 
        
        <TimeDisplay label="Std." value={timeLeft.hours} /> 
        
        <TimeDisplay label="Min." value={timeLeft.minutes} /> 
        
        <TimeDisplay label="Sek." value={timeLeft.seconds} />
      </div>
    </div>
  );
}

function TimeDisplay({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center   gap-1 border min-w-16 sm:min-w-24 bg-muted-foreground/20 rounded-md p-1 sm:p-2">
      <div className="font-mono text-xl sm:text-4xl tabular-nums  text-center">{value.toString().padStart(2, '0')}</div>
      <div className="font-normal  sm:text-base text-xs">{label}</div>
    </div>
  );
}

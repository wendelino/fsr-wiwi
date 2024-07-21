"use client";
import { useState, useEffect } from "react";

export default function Countdown() {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2024-10-01T00:00:00").getTime(); // Ziel-Datum als Zeitstempel
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-semibold text-3xl flex flex-col gap-6 p-4 bg-secondary rounded-xl items-center my-8 shadow-lg">
        Start der Erstiwoche
      <div className="font-semibold text-3xl flex gap-3 ">
        <TimeDisplay label="Tage" value={timeLeft.days} />
        :
        <TimeDisplay label="Stunden" value={timeLeft.hours} />
        :
        <TimeDisplay label="Minuten" value={timeLeft.minutes} />
        :
        <TimeDisplay label="Sekunden" value={timeLeft.seconds} />
      </div>
    </div>
  );
}

function TimeDisplay({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center pt-0.5">
      <div>{value}</div>
      <div className="font-normal text-base">{label}</div>
    </div>
  );
}

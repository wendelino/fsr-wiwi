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

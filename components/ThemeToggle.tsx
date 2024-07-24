"use client";
import { useEffect, useState } from "react"; 
import { MoonIcon, SunMediumIcon } from "lucide-react";
import { Switch } from "./ui/switch";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Überprüfen, ob der Dunkelmodus in den lokalen Speicher gespeichert ist
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
 

  return (
    <Switch
      onClick={toggleTheme} 
      checked={isDarkMode}
      switchContent={
        !isDarkMode ? <SunMediumIcon className="h-full w-full" /> : <MoonIcon className="h-full w-full" />
      }
    />
  );
}

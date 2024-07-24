"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MoveUpIcon } from "lucide-react";

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) { 
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <Button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 rounded-full shadow-lg w-12 h-12 p-0 "
        aria-label="Nach oben scrollen"
      >
        <MoveUpIcon/>
      </Button>
    )
  );
}

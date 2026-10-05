"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedListItem = ({
  children,
  className,
  index,
}: BaseProps & { index: number }) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // Nach dem ersten Render setzen wir isFirstRender auf false
    setIsFirstRender(false);
  }, []);

  return (
    <motion.li
      key={index}
      className={cn(
        "flex  items-center gap-4 bg-card p-6 rounded-lg shadow-md border",
        className
      )}
      initial={{ x: -50, y: 20, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        duration: 0.4,
        delay: isFirstRender ? 0.4 + index * 0.2 : 0,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        transition: { duration: 0.2, delay: 0 }, // Explizit delay: 0 für hover
      }}
    >
      {children}
    </motion.li>
  );
};
export const AnimatedHeader = ({ children, className }: BaseProps) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // Nach dem ersten Render setzen wir isFirstRender auf false
    setIsFirstRender(false);
  }, []);

  return (
    <motion.h2
      className={cn("text-2xl lg:text-4xl font-bold mb-12", className)}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h2>
  );
};

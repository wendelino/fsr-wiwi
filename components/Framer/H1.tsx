"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

export const H1 = ({ children, className }: BaseProps) => {
  return (
    <motion.h1
      className={cn("text-2xl lg:text-5xl font-bold mb-4", className)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h1>
  );
};

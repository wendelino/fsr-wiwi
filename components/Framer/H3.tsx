"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

export const H3 = ({ children, className }: BaseProps) => {
  return (
    <motion.h1
      className={cn("font-semibold text-lg mb-1", className)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h1>
  );
};

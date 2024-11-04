"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

export const P = ({ children, className }: BaseProps) => {
  return (
    <motion.p
      className={cn("text-base mx-auto", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {children}
    </motion.p>
  );
};

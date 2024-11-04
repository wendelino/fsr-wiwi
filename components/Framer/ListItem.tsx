"use client";

import {
  motion, 
} from "framer-motion"; 
import { cn } from "@/lib/utils";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}


export const ListItem = ({
    children,
    className,
    index,
  }: BaseProps & { index: number }) => {
    
  
    return (
      <motion.li
        key={index}
        className={cn(
          "list-none",
          className
        )}
        initial={{ x: -50, y: 20, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{
          duration: 0.4,
          delay: 0.3 + index * 0.15,
        }}
      >
        {children}
      </motion.li>
    );
  };
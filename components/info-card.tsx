"use client";
import { AlertTriangle, Info } from "lucide-react";
import Link from "next/link";

import { motion } from "framer-motion";

interface InfoCardProps {
  type: "info" | "warning";
  children?: React.ReactNode;
  displayContact?: boolean;
}
export function InfoCard({
  type,
  children,
  displayContact = true,
}: InfoCardProps) {
  const Icon = type === "info" ? Info : AlertTriangle;
  const color =
    type === "info"
      ? "text-blue-800 bg-blue-100 dark:text-blue-200 dark:bg-blue-900"
      : "text-yellow-800 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700";
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.7 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-xl w-full min-h-12  shadow-md border bg-muted/30 text-card-foreground p-4 px-8 flex flex-col gap-4 items-center max-w-md  mx-auto "
    >
      <div
        className={`absolute -top-3 -left-3  border size-10  rounded-full  flex items-center justify-center ${color}`}
      >
        <Icon className={`size-6`} />
      </div>
      <div className="text-sm sm:text-base font-medium">{children}</div>
      {displayContact && (
        <div className="text-muted-foreground">
          Du hast Fragen?{" "}
          <Link href="/kontakt" className="underline">
            Kontakt
          </Link>
        </div>
      )}
    </motion.div>
  );
}

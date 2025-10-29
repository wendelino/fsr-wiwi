"use client";
import { AlertTriangle, CheckCircleIcon, Info } from "lucide-react";
import Link from "next/link";

import { motion } from "motion/react";

interface InfoCardProps {
  type: "info" | "warning" | "success";
  children?: React.ReactNode;
  displayContact?: boolean;
  className?: string;
}
export function InfoCard({
  type,
  children,
  displayContact = true,
  className,
}: InfoCardProps) {
  const Icon = type === "info" ? Info : type === "warning" ? AlertTriangle : CheckCircleIcon;
  const color =
    type === "info"
      ? "text-blue-800 bg-blue-100 dark:text-blue-200 dark:bg-blue-900"
      : type === "warning"
      ? "text-yellow-800 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700"
      : "text-green-800 bg-green-100 dark:text-green-200 dark:bg-green-900 border-green-300 dark:border-green-700";
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.7 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-xl w-full min-h-12  shadow-md border bg-muted/30 text-card-foreground p-4 px-8 flex flex-col gap-4 items-center max-w-md  mx-auto ${className}`}
    >
      <div
        className={`absolute -top-3 -left-3  border size-10  rounded-full  flex items-center justify-center ${color}`}
      >
        <Icon className={`size-6`} />
      </div>
      <div className="text-sm sm:text-base font-medium text-center">{children}</div>
      {displayContact && (
        <div className="text-muted-foreground text-sm">
          Du hast Fragen?{" "}
          <Link href="/kontakt" className="underline">
            Kontakt
          </Link>
        </div>
      )}
    </motion.div>
  );
}

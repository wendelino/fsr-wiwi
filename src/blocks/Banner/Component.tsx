"use client";

import { motion } from "motion/react";
import type React from "react";
import type { BannerBlock as BannerBlockProps } from "src/payload-types";
import RichText from "@/components/RichText";
import { cn } from "@/utilities/ui";

type Props = {
  className?: string;
} & BannerBlockProps;

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <motion.div
      className={cn("mx-auto my-8 w-full", className)}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-60px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div
        className={cn("flex items-center rounded border px-6 py-3", {
          "border-border bg-card": style === "info",
          "border-error bg-error/30": style === "error",
          "border-success bg-success/30": style === "success",
          "border-warning bg-warning/30": style === "warning",
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </motion.div>
  );
};

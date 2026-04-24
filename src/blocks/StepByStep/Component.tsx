"use client";

import { motion } from "motion/react";
import type React from "react";
import type { StepByStepBlock as StepByStepBlockProps } from "@/payload-types";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const numberVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export const StepByStepBlock: React.FC<StepByStepBlockProps> = ({
  title,
  steps,
}) => {
  return (
    <div className="container my-16">
      {title && (
        <motion.h2
          className="mb-10 font-bold text-2xl md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-60px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h2>
      )}

      <motion.ol
        className="flex flex-col gap-6"
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true, margin: "-80px" }}
        whileInView="visible"
      >
        {(steps || []).map((step, index) => (
          <motion.li
            className="flex items-start gap-5"
            key={index}
            variants={stepVariants}
          >
            <motion.span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-sm"
              variants={numberVariants}
            >
              {index + 1}
            </motion.span>

            <div className="flex flex-col gap-1 pt-1">
              {step.stepTitle && (
                <span className="font-semibold text-base leading-snug">
                  {step.stepTitle}
                </span>
              )}
              {step.description && (
                <span className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </span>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
};

"use client";

import { motion } from "motion/react";
import type React from "react";
import { CMSLink } from "@/components/Link";
import RichText from "@/components/RichText";
import type { CallToActionBlock as CTABlockProps } from "@/payload-types";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
}) => {
  return (
    <div className="container">
      <motion.div
        className="flex flex-col gap-8 rounded border border-border bg-card p-4 md:flex-row md:items-center md:justify-between"
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true, margin: "-80px" }}
        whileInView="visible"
      >
        <motion.div
          className="flex max-w-[48rem] items-center"
          variants={itemVariants}
        >
          {richText && (
            <RichText className="mb-0" data={richText} enableGutter={false} />
          )}
        </motion.div>
        <motion.div className="flex flex-col gap-8" variants={itemVariants}>
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />;
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

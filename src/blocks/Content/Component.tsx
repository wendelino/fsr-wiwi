"use client";

import { motion } from "motion/react";
import type React from "react";
import RichText from "@/components/RichText";
import type { ContentBlock as ContentBlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";
import { CMSLink } from "../../components/Link";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props;

  const colsSpanClasses = {
    full: "12",
    half: "6",
    oneThird: "4",
    twoThirds: "8",
  };

  return (
    <div className="container my-16">
      <motion.div
        className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12"
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true, margin: "-80px" }}
        whileInView="visible"
      >
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col;

            return (
              <motion.div
                className={cn(
                  `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                  {
                    "md:col-span-2": size !== "full",
                  }
                )}
                key={index}
                variants={columnVariants}
              >
                {richText && <RichText data={richText} enableGutter={false} />}
                {enableLink && <CMSLink {...link} />}
              </motion.div>
            );
          })}
      </motion.div>
    </div>
  );
};

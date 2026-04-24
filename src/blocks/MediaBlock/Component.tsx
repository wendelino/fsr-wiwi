"use client";

import { motion } from "motion/react";
import type { StaticImageData } from "next/image";
import type React from "react";
import RichText from "@/components/RichText";
import type { MediaBlock as MediaBlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";
import { Media } from "../../components/Media";

type Props = MediaBlockProps & {
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props;

  let caption;
  if (media && typeof media === "object") {
    caption = media.caption;
  }

  return (
    <motion.div
      className={cn("", { container: enableGutter }, className)}
      initial={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, scale: 1 }}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn(
            "rounded-[0.8rem] border border-border",
            imgClassName
          )}
          resource={media}
          src={staticImage}
        />
      )}
      {caption && (
        <motion.div
          className={cn(
            "mt-6",
            { container: !disableInnerContainer },
            captionClassName
          )}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          <RichText data={caption} enableGutter={false} />
        </motion.div>
      )}
    </motion.div>
  );
};

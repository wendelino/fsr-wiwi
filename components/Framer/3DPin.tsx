"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <Link
      className={cn(
        "relative group/pin flex-1 min-w-48 min-h-32 cursor-pointer",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={href || "/"}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] h-full w-full -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 h-full w-full top-1/2  flex justify-start items-start  rounded-2xl bg-background  shadow-[0_8px_16px_rgb(0_0_0/0.4)]  group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
        >
          <div className={cn("h-full relative ", className)}>
            {children}
          </div>
        </div>
      </div>
      <PinPerspective title={title} href={href} />
    </Link>
  );
};

export const PinPerspective = ({
  title,
  href,
}: {
  title?: string;
  href?: string;
}) => {
  return (
    <motion.div className="pointer-events-none   flex items-center justify-center opacity-0  group-hover/pin:opacity-100 z-[60] transition duration-500">
       <div className="absolute top-0 inset-x-0  flex justify-center">
          <a
            href={href}
            target={"_blank"}
            className="relative flex space-x-2 items-center z-10 rounded-full bg-foreground py-0.5 px-4 ring-1 ring-white/10 "
          >
            <span className=" relative z-20 text-background text-xs font-bold flex items-center py-0.5">
              <ChevronRight className="w-5 h" />
              {title}
            </span>

            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </a>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2  mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2  h-[10rem] w-[10rem] rounded-[50%] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className="absolute left-1/2 top-1/2  h-[10rem] w-[10rem] rounded-[50%]   shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute left-1/2 top-1/2  h-[10rem] w-[10rem] rounded-[50%]  shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
          </>
        </div>

        <>
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-fsr translate-y-[14px] w-px h-1/2   blur-[2px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-fsr translate-y-[14px] w-px h-1/2  " />
        </>
    </motion.div>
  );
};

interface Props {
  title: string;
  subtitle: string;
  href: string;
}

export function AnimatedPinLink({ title, subtitle, href }: Props) {
    return (
      <PinContainer title={title} href={href}>
        <div className="flex flex-col h-full p-4">
          <h3 className="font-bold text-base">{title}</h3>
          <div className="text-base font-normal">
            <span className="text-foreground/70">{subtitle}</span>
          </div>
          <div className="flex-1"></div>
  
          <p className="flex items-center gap-1 text-foreground/70 text-sm">
            weiterlesen <ChevronRight className="h-5" />
          </p>
        </div>
      </PinContainer>
    );
  }

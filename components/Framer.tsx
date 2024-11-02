"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useAnimation,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

export const FadeInSection = ({ children, className }: BaseProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.7, delay: 0.1 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedListItem = ({
  children,
  className,
  index,
}: BaseProps & { index: number }) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // Nach dem ersten Render setzen wir isFirstRender auf false
    setIsFirstRender(false);
  }, []);

  return (
    <motion.li
      key={index}
      className={cn(
        "flex  items-center gap-4 bg-card p-6 rounded-lg shadow-md border",
        className
      )}
      initial={{ x: -50, y: 20, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        duration: 0.4,
        delay: isFirstRender ? 0.4 + index * 0.2 : 0,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        transition: { duration: 0.2, delay: 0 }, // Explizit delay: 0 für hover
      }}
    >
      {children}
    </motion.li>
  );
};
export const AnimatedHeader = ({ children, className }: BaseProps) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // Nach dem ersten Render setzen wir isFirstRender auf false
    setIsFirstRender(false);
  }, []);

  return (
    <motion.h2
      className="text-4xl font-bold mb-12 text-center"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h2>
  );
};

export const Fsr_letters = ({ input }: { input: string }) => {
  return input.split(" ").map((i, index) => (
    <motion.div
      key={index}
      className="inline"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.6 + index * 0.2 }}
    >
      {i}{" "}
    </motion.div>
  ));
};

interface ProgressBarProps {
  height?: number;
  color?: string;
  backgroundColor?: string;
  vertical?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  height = 4,
  color = "hsl(var(--primary))",
  backgroundColor = "hsl(var(--primary) / 0.2)",
  vertical = false,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    springConfig
  );

  const progressStyle = vertical
    ? { scaleY: scaleProgress, originY: 0 }
    : { scaleX: scaleProgress, originX: 0 };

  const containerStyle = true
    ? { width: height, height: "100%" }
    : { height, width: "100%" };

  return (
    <div
      ref={containerRef}
      className="overflow-hidden  rounded-full"
      style={{
        ...containerStyle,
        backgroundColor,
      }}
    >
      <motion.div
        className="h-full w-full"
        style={{
          ...progressStyle,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

interface VerticalScrollProgressProps {
  children: ReactNode;
  className?: string;
}

const VerticalScrollProgress = ({
  children,
  className = "",
}: VerticalScrollProgressProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transformiere den Scroll-Progress, sodass er von oben nach unten läuft
  const yProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Smoothere Animation mit useSpring
  const scaleY = useSpring(yProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className={`relative border ${className}`}>
      <motion.div className="absolute left-0 top-0 bottom-0 w-4 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 w-full bg-gray-800 rounded-full"
          style={{
            height: "100%",
            transformOrigin: "top",
            scaleY,
          }}
        />
      </motion.div>
      {children}
    </div>
  );
};

const VerticalScrollProgressCentered = ({
  children,
  className = "",
}: VerticalScrollProgressProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scrollfortschritt basierend auf dem gesamten Dokument
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Smoothere Animation mit useSpring
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className={`relative ${className} h-full`}>
      {/* Der Fortschrittsbalken bleibt in der Mitte des Bildschirms */}
      <motion.div className="fixed left-0 top-1/2 transform -translate-y-1/2 w-4 bg-gray-200 h-1/2">
        <motion.div
          className="w-full h-full bg-gray-800 origin-top"
          style={{ scaleY }}
        />
      </motion.div>
      <div ref={containerRef} className="h-full border">{children}</div>
    </div>
  );
};

// Demo-Komponente zur Verwendung
const DemoContainer = () => {
  return (
    <VerticalScrollProgressCentered>
      <div className=" space-y-8 ">
        {[...Array(7)].map((_, index) => (
          <div key={index} className="p-6 bg-card rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Section {index + 1}</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        ))}
      </div>
    </VerticalScrollProgressCentered>
  );
};

export default DemoContainer;

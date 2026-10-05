"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";

export type ResultStep = { label: string; state: "done" | "current" | "open" };

/**
 * Erfolg/Fehler nach einer Aktion (Anmeldung, Kontakt, E-Mail-Bestätigung):
 * gezeichnetes Icon, gestaffelter Text, optionale Schritte und Aktionen.
 */
export function ResultState({
  status,
  eyebrow,
  title,
  children,
  detail,
  steps,
  actions,
  className,
}: {
  status: "success" | "error";
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
  /** Originalmeldung des Servers, klein unter dem Text */
  detail?: string;
  steps?: ResultStep[];
  actions?: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  // Inhalt erscheint nacheinander, nachdem das Icon gezeichnet ist
  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.45 + i * 0.08, duration: 0.35, ease: "easeOut" as const },
        };

  return (
    <div
      role={status === "error" ? "alert" : "status"}
      className={cn("flex flex-col items-center text-center", className)}
    >
      <ResultIcon status={status} reduce={!!reduce} />
      {eyebrow && (
        <motion.p {...item(0)} className="mt-6 text-xs font-bold uppercase tracking-widest text-fsr">
          {eyebrow}
        </motion.p>
      )}
      <motion.h3 {...item(1)} className="mt-2 text-3xl font-black tracking-tight">
        {title}
      </motion.h3>
      {children && (
        <motion.div {...item(2)} className="mt-3 max-w-sm text-muted-foreground">
          {children}
        </motion.div>
      )}
      {detail && (
        <motion.p
          {...item(3)}
          className="mt-4 max-w-sm rounded-2xl bg-muted px-4 py-2 text-sm text-foreground/80"
        >
          {detail}
        </motion.p>
      )}
      {steps && (
        <motion.ol {...item(4)} className="mt-6 w-full max-w-sm space-y-2 text-left">
          {steps.map((s, i) => (
            <li
              key={s.label}
              className={cn(
                "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm",
                s.state === "current" && "border-fsr/40 bg-fsr/5",
                s.state === "open" && "text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "relative flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  s.state === "done" && "bg-fsr-deep text-white",
                  s.state === "current" && "bg-fsr/15 text-fsr",
                  s.state === "open" && "bg-muted"
                )}
              >
                {s.state === "current" && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-fsr/30 motion-reduce:animate-none" />
                )}
                {s.state === "done" ? "✓" : i + 1}
              </span>
              <span className={cn(s.state === "current" && "font-semibold")}>{s.label}</span>
            </li>
          ))}
        </motion.ol>
      )}
      {actions && (
        <motion.div
          {...item(5)}
          className="mt-8 flex w-full max-w-sm flex-col gap-2 sm:flex-row sm:justify-center [&>*]:flex-1"
        >
          {actions}
        </motion.div>
      )}
    </div>
  );
}

function ResultIcon({ status, reduce }: { status: "success" | "error"; reduce: boolean }) {
  const success = status === "success";
  const draw = reduce
    ? {}
    : {
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { delay: 0.2, duration: 0.35, ease: "easeOut" as const },
      };

  return (
    <motion.div
      className="relative"
      initial={reduce ? false : { scale: 0.4, opacity: 0 }}
      animate={
        reduce
          ? undefined
          : success
            ? { scale: 1, opacity: 1 }
            : { scale: 1, opacity: 1, x: [0, -8, 8, -5, 5, 0] }
      }
      transition={
        success
          ? { type: "spring", stiffness: 260, damping: 16 }
          : { duration: 0.5, x: { delay: 0.35, duration: 0.4 } }
      }
    >
      {/* Einmaliger Ring, der nach außen ausläuft */}
      {!reduce && (
        <motion.span
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-full border-2",
            success ? "border-fsr" : "border-destructive"
          )}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
        />
      )}
      {/* Kleine Funken bei Erfolg */}
      {success && !reduce &&
        Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <motion.span
              key={i}
              aria-hidden
              className={cn(
                "absolute left-1/2 top-1/2 -ml-1 -mt-1 size-2 rounded-full",
                i % 2 ? "bg-fsr" : "bg-fsr-foreground"
              )}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
              animate={{
                x: Math.cos(angle) * 64,
                y: Math.sin(angle) * 64,
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.6],
              }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            />
          );
        })}
      <span
        className={cn(
          "relative flex size-20 items-center justify-center rounded-full",
          success ? "bg-fsr-deep text-white shadow-lg shadow-fsr/30" : "bg-destructive/10 text-destructive"
        )}
      >
        <svg viewBox="0 0 24 24" className="size-10" fill="none" stroke="currentColor" strokeWidth={2.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {success ? (
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" {...draw} />
          ) : (
            <>
              <motion.path d="M7 7l10 10" {...draw} />
              <motion.path d="M17 7L7 17" {...draw} />
            </>
          )}
        </svg>
      </span>
    </motion.div>
  );
}

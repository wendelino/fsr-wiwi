import { Stagger, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

/** Kleine Zeile über Überschriften: fett, Versalien, gesperrt, Markenfarbe. */
export function Eyebrow({
  children,
  className,
  onDark,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <p
      className={cn(
        "text-sm font-bold uppercase tracking-widest",
        onDark ? "text-white/70" : "text-fsr",
        className
      )}
    >
      {children}
    </p>
  );
}

/** Eyebrow + h2 im Poster-Stil, der Standard-Einstieg jeder Sektion; erscheint beim Hineinscrollen. */
export function SectionHeading({
  eyebrow,
  title,
  className,
  children,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  className?: string;
  /** Optionaler Einleitungstext unter der Überschrift */
  children?: React.ReactNode;
}) {
  return (
    <Stagger className={className} step={0.08}>
      {eyebrow && (
        <StaggerItem variant="left">
          <Eyebrow>{eyebrow}</Eyebrow>
        </StaggerItem>
      )}
      <StaggerItem>
        <h2 className="mt-1 hyphens-auto text-4xl font-black tracking-tight md:text-5xl">{title}</h2>
      </StaggerItem>
      {children && (
        <StaggerItem className="mt-4 max-w-xl text-muted-foreground">{children}</StaggerItem>
      )}
    </Stagger>
  );
}

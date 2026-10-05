import { cn } from "@/lib/utils";

/**
 * Bricht aus dem WidthWrapper aus und geht über die volle Fensterbreite.
 * Als erstes Element einer Seite gleicht -mt-8 das pt-8 von <main> aus.
 */
export function FullBleed({
  children,
  className,
  flush = true,
}: {
  children: React.ReactNode;
  className?: string;
  /** Direkt unter der Navbar beginnen */
  flush?: boolean;
}) {
  return (
    <section
      className={cn(flush && "-mt-8", className)}
      style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
    >
      {/* Kein horizontaler Scrollbalken durch 100vw */}
      <style>{`body{overflow-x:clip}`}</style>
      {children}
    </section>
  );
}

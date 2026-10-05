import { Parallax } from "@/components/motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const LOGO_POSITION = {
  "top-right": "-right-24 -top-16 hidden md:block",
  "bottom-left": "-bottom-24 -left-24",
  "bottom-right": "-bottom-16 -right-24",
};

/**
 * Deko für Bordeaux-Flächen: zwei radiale Verläufe und das Outline-Logo,
 * das beim Scrollen langsam mitwandert. Braucht ein `relative`-Elternelement.
 */
export function HeroDeco({
  logo = "top-right",
  parallax = true,
  className,
}: {
  logo?: keyof typeof LOGO_POSITION | false;
  parallax?: boolean;
  className?: string;
}) {
  const image = (
    <Image src="/logo_outline.png" alt="" width={420} height={423} className="w-full opacity-[0.07] invert" />
  );
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(0,0,0,0.35),transparent_50%)]" />
      {logo && (
        <div className={cn("absolute w-[360px] md:w-[420px]", LOGO_POSITION[logo])}>
          {parallax ? (
            <Parallax offset={logo === "top-right" ? 90 : -60} rotate={12}>
              {image}
            </Parallax>
          ) : (
            image
          )}
        </div>
      )}
    </div>
  );
}

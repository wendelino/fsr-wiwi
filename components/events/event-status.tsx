import { isFull, isLottery, isOverbooked, lotteryText, seatsLabel } from "@/lib/events";
import { Phase } from "@/lib/use-now";
import { cn } from "@/lib/utils";
import { Dices } from "lucide-react";

export { isFull, seatsLabel };

/** Einheitliche Status-Badges: läuft gerade, Anmeldung/Plätze, Losverfahren, ausgebucht, vorbei. */
export function EventStatus({
  event,
  phase,
  className,
}: {
  event: EventItem;
  phase: Phase;
  className?: string;
}) {
  const seats = seatsLabel(event);
  if (phase !== "live" && !seats && phase !== "past") return null;
  const overbooked = isOverbooked(event);
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {phase === "live" && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-fsr-deep px-2 py-0.5 text-[11px] font-semibold text-white">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex size-1.5 rounded-full bg-white" />
          </span>
          Läuft gerade
        </span>
      )}
      {phase === "past" && (
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          Vorbei
        </span>
      )}
      {seats && phase !== "past" && (
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
            isFull(event)
              ? "bg-destructive/10 text-destructive"
              : "bg-fsr/10 text-fsr"
          )}
        >
          {overbooked && <Dices className="size-3" />}
          {seats}
        </span>
      )}
      {isLottery(event) && !overbooked && phase !== "past" && (
        <span className="inline-flex items-center gap-1 rounded-full border border-fsr/30 px-2 py-0.5 text-[11px] font-semibold text-fsr">
          <Dices className="size-3" /> Losverfahren
        </span>
      )}
    </div>
  );
}

/** Hinweis zum Losverfahren; rendert nichts für normale Events. */
export function LotteryNote({
  event,
  className,
  onDark,
}: {
  event: EventItem;
  className?: string;
  onDark?: boolean;
}) {
  if (!isLottery(event)) return null;
  return (
    <div
      className={cn(
        "flex gap-3 rounded-2xl p-4 text-sm",
        onDark ? "bg-white/10 text-white" : "bg-fsr/10 text-foreground",
        className
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          onDark ? "bg-white text-fsr-deep" : "bg-fsr-deep text-white"
        )}
      >
        <Dices className="size-4" />
      </span>
      <p>
        <strong className="font-semibold">Losverfahren.</strong> {lotteryText(event)}
      </p>
    </div>
  );
}

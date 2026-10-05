"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { handleSafeCalendar } from "@/lib/utils";
import { CalendarPlus, Clock } from "lucide-react";
import Link from "next/link";
import { formatBerlin, timeRange } from "./berlin";
import { EventStatus, isFull } from "./event-status";
import { Phase } from "./use-now";

/** Detail-Dialog; children ist der Trigger und sollte ein <button> sein. */
export function EventDialog({
  event,
  phase,
  children,
}: {
  event: EventItem;
  phase: Phase;
  children: React.ReactNode;
}) {
  const canRegister = event.registrable && !isFull(event) && phase !== "past";
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl pr-6">{event.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {formatBerlin(event.start, "EEEE, dd.MM.")} · {timeRange(event.start, event.end)} Uhr
          </DialogDescription>
        </DialogHeader>
        <EventStatus event={event} phase={phase} />
        {event.description && (
          <p className="text-sm whitespace-pre-line text-foreground/80">
            {event.description}
          </p>
        )}
        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => handleSafeCalendar(event)}
            data-umami-event={"SaveCalendar-DESIGN-" + event.slug}
          >
            <CalendarPlus className="size-4 mr-2" />
            In meinen Kalender
          </Button>
          {canRegister && (
            <Button
              asChild
              className="bg-fsr-deep text-white hover:bg-fsr-deep/90"
              data-umami-event={"Signup-DESIGN-" + event.slug}
            >
              <Link href={"/anmeldung/" + event.slug}>Zur Anmeldung</Link>
            </Button>
          )}
          {event.registrable && isFull(event) && (
            <Button disabled>Ausgebucht</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

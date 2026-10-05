"use client";

import { Button } from "@/components/ui/button";
import { canRegister, isFull, signupButtonLabel } from "@/lib/events";
import { cn, handleSafeCalendar } from "@/lib/utils";
import { CalendarPlus, Ticket } from "lucide-react";
import Link from "next/link";

/** Anmelden + Kalender, untereinander für Seitenleisten. */
export function EventActions({
  event,
  past,
  showSignup = true,
  className,
}: {
  event: EventItem;
  past: boolean;
  showSignup?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {showSignup && canRegister(event, past) && (
        <Button asChild size="lg" className="bg-fsr-deep text-white hover:bg-fsr-deep/90">
          <Link href={"/anmeldung/" + event.slug} data-umami-event={"Signup-" + event.slug}>
            <Ticket className="mr-2 size-4" /> {signupButtonLabel(event)}
          </Link>
        </Button>
      )}
      {showSignup && !past && isFull(event) && (
        <Button size="lg" disabled>
          Ausgebucht
        </Button>
      )}
      <Button
        size="lg"
        variant="outline"
        onClick={() => handleSafeCalendar(event)}
        data-umami-event={"SaveCalendar-" + event.slug}
      >
        <CalendarPlus className="mr-2 size-4" /> In meinen Kalender
      </Button>
    </div>
  );
}

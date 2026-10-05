"use client";

import { ResultState } from "@/components/result-state";
import { Button } from "@/components/ui/button";
import { ERSTI_PROGRAM, ERSTI_TAG } from "@/lib/ersti";
import { isLottery, signupSuccessText } from "@/lib/events";
import { handleSafeCalendar } from "@/lib/utils";
import { CalendarPlus } from "lucide-react";
import Link from "next/link";

// Standardtexte, die keine eigene Information enthalten
const GENERIC_MESSAGES = ["Erfolgreich gesendet!", ""];

/** Erfolgsansicht nach dem Absenden einer Anmeldung. */
export function SignupSuccess({ event, message }: { event: EventItem; message?: string }) {
  const lottery = isLottery(event);
  const isErsti = event.tagsNew?.includes(ERSTI_TAG);
  return (
    <ResultState
      status="success"
      eyebrow={event.title}
      title="Fast geschafft!"
      detail={message && !GENERIC_MESSAGES.includes(message) ? message : undefined}
      steps={[
        { label: "Anmeldung abgeschickt", state: "done" },
        { label: "E-Mail bestätigen", state: "current" },
        { label: lottery ? "Auslosung abwarten" : "Du bist dabei", state: "open" },
      ]}
      actions={
        <>
          <Button
            size="lg"
            onClick={() => handleSafeCalendar(event)}
            className="bg-fsr-deep text-white hover:bg-fsr-deep/90"
            data-umami-event={"SaveCalendar-SIGNUP-" + event.slug}
          >
            <CalendarPlus className="mr-2 size-4" /> In meinen Kalender
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={isErsti ? ERSTI_PROGRAM : "/anmeldung"}>Weitere Termine</Link>
          </Button>
        </>
      }
    >
      {signupSuccessText(event)}
    </ResultState>
  );
}

import { formatInTimeZone } from "date-fns-tz";
import { ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";

import { cn } from "@/lib/utils";
import { createEvent } from "ics";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const BERLIN_TZ = "Europe/Berlin";
const formatBerlinTime = (date: Date) =>
  formatInTimeZone(date, BERLIN_TZ, "HH:mm");

export default function GridItem({
  event,
  length,
}: {
  event: EventItem;
  length?: number;
}) {
  if (length) {
    return (
      <div
        className={cn(
          "h-full w-full p-2 rounded-md border border-muted-foreground/30  text-xs bg-background/80 hover:bg-muted/40 backdrop-blur-sm transition-all duration-300",
          ` ${length ? "cursor-pointer" : "cursor-default"}`,
          length && "bg-muted/80 text-fsr"
        )}
      >
        <div className="flex items-center justify-between gap-2 text-foreground">
          <div className="font-medium line-clamp-1">
            {length ? `${length} Slots` : event.title}
          </div>
          <div className="shrink-0 tabular-nums">
            {formatBerlinTime(event.start)}–{formatBerlinTime(event.end)}
          </div>
        </div>
        {length ? (
          <div className="  gap-1 text-xs items-center  mt-3 flex justify-end  ">
            <span> anzeigen</span>{" "}
            <ChevronRight className="size-4 inline-block" />
          </div>
        ) : (
          <div className="mt-0.5 text-[11px] text-muted-foreground line-clamp-1">
            {event.description}
          </div>
        )}
        {!length && (
          <div className="flex justify-end w-full gap-2 flex-wrap mt-2">
            {event.registrable && (
              <Badge className=" font-medium">Anmeldepflichtig!</Badge>
            )}
          </div>
        )}
      </div>
    );
  }
  const handleSafeCalendar = () => {
    const icsEvent: any = {
      start: [
        event.start.getFullYear(),
        event.start.getMonth() + 1,
        event.start.getDate(),
        event.start.getHours(),
        event.start.getMinutes(),
      ],
      end: [
        event.end.getFullYear(),
        event.end.getMonth() + 1,
        event.end.getDate(),
        event.end.getHours(),
        event.end.getMinutes(),
      ],
      title: event.title,
      description: event.description,
      status: "CONFIRMED",
      busyStatus: "BUSY",
    };

    createEvent(icsEvent, (error, value) => {
      if (error) {
        console.error(error);
        return;
      }

      const blob = new Blob([value], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "events.ics";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  const { title, description, registrable, start, end, slug, restSeats } =
    event;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "h-full w-full p-2 rounded-md border border-muted-foreground/30  text-xs bg-background/80 hover:bg-muted/40 backdrop-blur-sm transition-all duration-300",
            ` ${length ? "cursor-pointer" : "cursor-default"}`,
            length && "bg-muted/80 text-fsr"
          )}
        >
          <div className="flex items-center justify-between gap-2 text-foreground">
            <div className="font-medium line-clamp-1">
              {length ? `${length} Slots` : title}
            </div>
            <div className="shrink-0 tabular-nums">
              {formatBerlinTime(start)}–{formatBerlinTime(end)}
            </div>
          </div>
          {length ? (
            <div className="  gap-1 text-xs items-center  mt-3 flex justify-end  ">
              <span> anzeigen</span>{" "}
              <ChevronRight className="size-4 inline-block" />
            </div>
          ) : (
            <div className="mt-0.5 text-[11px] text-muted-foreground line-clamp-1">
              {description}
            </div>
          )}
          {!length && (
            <div className="flex justify-start w-full gap-2 flex-wrap mt-2">
              {registrable && (
                <>
                  {restSeats == 0 ? (
                    <Badge variant="destructive">Ausgebucht!</Badge>
                  ) : (
                    <Badge className=" font-medium">Anmeldepflichtig!</Badge>
                  )}
                </>
              )}
            </div>
          )}

          <ChevronRight className="size-4 inline-block absolute right-1 bottom-1 bg-background text-muted-foreground rounded-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <div className="flex gap-2 pb-6">
            {/* {event.location && (
                  <span className="bg-secondary text-foreground  flex items-center pr-2 py-1 rounded-lg">
                    <MapPin height={16} /> {event.location?.label}
                  </span>
                )} */}
          </div>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>
            {" "}
            <span className="font-extralight py-2">
              <strong>{formatBerlinTime(start)} </strong>
              bis <strong>{formatBerlinTime(end)}</strong>
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="my-2">
          {registrable && (
            <div className="flex justify-center  w-full gap-2 flex-wrap mb-4">
              <Badge variant="secondary">Anmeldepflichtig</Badge>
              <Badge>{restSeats} Plätze übrig</Badge>
            </div>
          )}
          <div className="text-sm whitespace-pre-line">{description}</div>
        </div>
        <DialogFooter className="gap-2 ">
          <Button onClick={handleSafeCalendar} variant="secondary" data-umami-event={"SafeCalendar-GRID-"+event.slug}>
            Im Kalender sichern
          </Button>
          {registrable && (
            <>
              {restSeats == 0 ? (
                <Button disabled>Event ausgebucht</Button>
              ) : (
                <Button asChild data-umami-event={"Signup-GRID-"+event.slug}>
                  <Link href={"anmeldung/" + slug}>Zur Anmeldung</Link>
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

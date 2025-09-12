import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { createEvent } from "ics";
import Link from "next/link";
import { Button } from "../ui/button";

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
            {format(event.start, "HH:mm")}–{format(event.end, "HH:mm")}
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
  return (
    <Drawer>
      <DrawerTrigger asChild> 
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
            {format(event.start, "HH:mm")}–{format(event.end, "HH:mm")}
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
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <div className="flex gap-2 pb-6">
              {/* {event.location && (
                  <span className="bg-secondary text-foreground  flex items-center pr-2 py-1 rounded-lg">
                    <MapPin height={16} /> {event.location?.label}
                  </span>
                )} */}
            </div>
            <DrawerTitle>{event.title}</DrawerTitle>
            <span className="font-extralight py-2">
              <strong>{format(event.start, "HH:mm")} </strong>
              bis <strong>{format(event.end, "HH:mm")}</strong>
            </span>

            <DrawerDescription>{event.description}</DrawerDescription>
          </DrawerHeader>

          <DrawerFooter>
            {event.registrable && (
              <Button asChild>
                <Link href={"anmeldung/" + event.slug}>
                  Jetzt anmelden
                </Link>
              </Button>
            )}
            <Button onClick={handleSafeCalendar}>Im Kalender sichern</Button>
            <DrawerClose asChild>
              <Button variant="outline">Zurück</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function EventCard({ event }: { event: EventItem }) {
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

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <GridItem event={event} />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <div className="flex gap-2 pb-6">
              {/* {event.location && (
                  <span className="bg-secondary text-foreground  flex items-center pr-2 py-1 rounded-lg">
                    <MapPin height={16} /> {event.location?.label}
                  </span>
                )} */}
            </div>
            <DrawerTitle>{event.title}</DrawerTitle>
            <span className="font-extralight py-2">
              <strong>{format(event.start, "HH:mm")} </strong>
              bis <strong>{format(event.end, "HH:mm")}</strong>
            </span>

            <DrawerDescription>{event.description}</DrawerDescription>
          </DrawerHeader>

          <DrawerFooter>
            {event.registrable && (
              <Button asChild>
                <Link href={"erstiwoche/anmeldung/" + event.title}>
                  Jetzt anmelden
                </Link>
              </Button>
            )}
            <Button onClick={handleSafeCalendar}>Im Kalender sichern</Button>
            <DrawerClose asChild>
              <Button variant="outline">Zurück</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

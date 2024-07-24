"use client";
import { format } from "date-fns";

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
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin } from "lucide-react";
import { createEvent } from "ics";
import { Location_DB } from "@prisma/client";

interface Location {
  name: string;
  maps_link: string;
}
export interface EventProps {
  name: string;
  description?: string;
  location?: Location;
  start: Date;
  end: Date;
  tag?: string[];
}
export default function EventCard({ event }: { event: EventProps }) {
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
      title: event.name,
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
        <div className="flex flex-col items-start bg-red-50 p-2 rounded-lg gap-2 relative text-sm">
          <span className="bg-red-200 flex items-center pr-2 py-1 rounded-lg">
            <MapPin height={16} /> {event.location?.name}
          </span>
          <div className="flex flex-col">
            <span className="font-semibold">{event.name}</span>
            <span className="font-extralight">
              <strong>{format(event.start, "HH:mm")} </strong>
              bis <strong>{format(event.end, "HH:mm")}</strong>
            </span>
          </div>
          {event.tag && (
            <div className="flex flex-wrap justify-end gap-1 w-full">
              {event.tag.map((e, index) => (
                <Badge key={index}>{e}</Badge>
              ))}
            </div>
          )}
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <div className="flex gap-2 pb-6">
              <span className="flex items-center font-semibold pr-2 rounded-lg">
                <MapPin height={16} /> {event.location?.name}
              </span>
            </div>
            <DrawerTitle>{event.name}</DrawerTitle>
            <span className="font-extralight py-2">
              <strong>{format(event.start, "HH:mm")} </strong>
              bis <strong>{format(event.end, "HH:mm")}</strong>
            </span>

            <DrawerDescription>{event.description}</DrawerDescription>
          </DrawerHeader>

          <div className="p-4">
            {event.tag && (
              <div className="flex flex-wrap justify-end gap-1 w-full">
                {event.tag.map((e, index) => (
                  <Badge key={index}>{e}</Badge>
                ))}
              </div>
            )}
          </div>
          <DrawerFooter>
            <Button>Anmelden</Button>
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

export function LocationCard({ location }: { location: Location_DB }) {
  const handleMapsRedirect = () => {
    //if (location) window.open(event.location.maps_link, "_blank");
  };

  return (
    <div className="flex gap-2 py-2">
      <span className="flex items-center font-semibold pr-2 rounded-lg">
        <MapPin height={16} /> {location.label}
      </span>
      <Button variant={"outline"} onClick={() => handleMapsRedirect()}>
        Auf Maps anzeigen {"–>"}
      </Button>
    </div>
  );
}

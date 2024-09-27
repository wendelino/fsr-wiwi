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
import { MapPin, MoveRightIcon } from "lucide-react";
import { createEvent } from "ics";
import { Location_DB } from "@prisma/client";
import Link from "next/link";

export type EventProps = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  is_public: boolean;
  registrable: boolean;
  max_guests: number | null;
  rest_seats: number | null;
};
export type LocationProps = {
  id: string;
  label: string;
  lat: number;
  long: number;
};

export type EventWithLocation = EventProps & { location: LocationProps | null };

export default function EventCard({ event }: { event: EventWithLocation }) {
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

  const special = [
    "Streik, Gewerkschaften, TVStud!",
    "Powerpoint-Karaoke",
    "Impro Theater Workshop",
    "Einführungsveranstaltung",
    "Stadtrallye",
    "Kneipentour Master",
    "Kneipentour Internationals",
    "Kneipentour Master Raucher*innen",
    "Kneipentour Master NICHT-Raucher*innen",
  ].includes(event.title);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex flex-col items-start fsr-background-1 p-2 text-white rounded-lg gap-1.5 relative text-sm shadow-lg">
          {event.location && (
            <span className="bg-secondary text-foreground  flex items-center pr-2 py-1 rounded-lg">
              <MapPin height={16} /> {event.location?.label}
            </span>
          )}

          {special && (
            <div className="bg-foreground z-[3] text-background font-bold rounded-full px-2 py-1 absolute right-[-12px] top-[-4px] animate-bounce">
              EMPFOHLEN!
            </div>
          )}

          {event.rest_seats == 0 && (
            <div className="absolute rounded-lg inset-0 bg-background/80 flex justify-center items-center text-2xl font-bold text-foreground ">
              Ausgebucht!
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-semibold">{event.title}</span>
            <span className="font-extralight">
              <strong>{format(event.start, "HH:mm")} </strong>
              bis <strong>{format(event.end, "HH:mm")}</strong>
            </span>
          </div>
          <div className="flex justify-end w-full gap-2 flex-wrap">
            {event.registrable && <Badge>Anmeldepflichtig!</Badge>}
            {event.rest_seats ? (
              <Badge variant={"secondary"}>
                {event.rest_seats} Plätze übrig!
              </Badge>
            ) : null}
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <div className="flex gap-2 pb-6">
              {event.location && (
                <span className="bg-secondary text-foreground  flex items-center pr-2 py-1 rounded-lg">
                  <MapPin height={16} /> {event.location?.label}
                </span>
              )}
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

export function LocationCard({ location }: { location: Location_DB }) {
  const handleGoogle = () =>
    window.open(
      `https://maps.google.com/?q=${location.lat},${location.long}`,
      "_blank"
    );
  const handleApple = () =>
    window.open(
      `https://maps.apple.com/?q=${location.lat},${location.long}`,
      "_blank"
    );

  return (
    <div className="flex flex-col gap-4">
      <span className="flex items-center font-semibold pr-2 ">
        <MapPin height={18} /> {location.label}
      </span>
      <div className="flex gap-2 w-full flex-wrap min-w-32">
        <Button
          variant={"outline"}
          type="button"
          className="flex-1 group "
          onClick={() => handleGoogle()}
        >
          <img
            className="h-full pr-2 group-hover:animate-bounce"
            onError={(e: any) => {
              e.target.style.display = "none";
            }}
            alt="Google Logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/418px-Google_Maps_icon_%282020%29.svg.png"
          />
          Google
        </Button>
        <Button
          variant={"outline"}
          type="button"
          className="flex-1 group  "
          onClick={() => handleApple()}
        >
          <img
            className="h-full pr-2 group-hover:animate-bounce  "
            onError={(e: any) => {
              e.target.style.display = "none";
            }}
            alt="Apple Logo"
            src="https://www.apple.com/v/maps/d/images/overview/intro_icon__dfyvjc1ohbcm_large.png"
          />
          Apple
        </Button>
      </div>
    </div>
  );
}

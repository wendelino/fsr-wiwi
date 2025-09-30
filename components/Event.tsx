"use client";

import { handleSafeCalendar } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { Section } from "./Framer/Section";
import { Button } from "./ui/button";
type Location_DB = {
  label: string;
  lat: number;
  long: number;
};
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

export type EventWithLocation = EventProps & { location_id: string | null };
 

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

export function FullEventView({ event }: { event: EventItem }) {
  return (
    <>
      <Section className="whitespace-pre-line">{event.description}</Section>
      <Section className="flex justify-end gap-2">
        <Button onClick={() => handleSafeCalendar(event)} variant="secondary" data-umami-event={"SaveCalendar-"+event.slug}>
          <Calendar className="size-4 mr-2"  />
          Im Kalender sichern
        </Button>
        {event.registrable && (
          <Button asChild data-umami-event={"Signup-"+event.slug}>
            <Link href={"/anmeldung/" + event.slug}>
              Jetzt anmelden
            </Link>
          </Button>
        )}
      </Section>
    </>
  );
}

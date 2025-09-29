"use client";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { handleSafeAllEventsCalendar } from "@/lib/utils";

export default function SaveCalendarButton({ events }: { events: EventItem[] }) {
  const handleSave = () => {
    handleSafeAllEventsCalendar(events);
  };
  return <Button onClick={handleSave}>Im Kalender sichern <ChevronRight className="size-4 ml-1" /></Button>;
}
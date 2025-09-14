"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { de } from "date-fns/locale";

export function SelectEventForm({ events }: { events: EventItem[] }) {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  function onCreate() {
    if (!selectedEvent) return;
    router.push(`anmeldung/${selectedEvent?.slug}`);
  }
  function handleEventChange(slug: string) {
    const event = events.find((e) => e.slug === slug);
    setSelectedEvent(event || null);
  }

  return (
    <div className="space-y-6 flex flex-col w-full max-w-md border p-8 rounded-lg shadow-lg">
      <Label>Veranstaltung auswählen</Label>
      <Select onValueChange={handleEventChange}>
        <SelectTrigger>
          <SelectValue placeholder={"Wähle eine Veranstaltung"} />
        </SelectTrigger>
        <SelectContent>
          {events.map((e) => (
            <SelectItem key={e.slug} value={e.slug} disabled={e.restSeats === 0}>
              {e.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedEvent && (
        <div className="flex flex-col gap-8 ">
          <div>
            <span className="font-semibold">
              {format(selectedEvent.start, "EEEE, dd.MM.yyyy ", {
                locale: de,
              })}
            </span>
            <p>
              Von{" "}
              <span className="font-semibold">
                {format(selectedEvent.start, "HH:mm")}
              </span>{" "}
              bis{" "}
              <span className="font-semibold">
                {format(selectedEvent.end, "HH:mm")}
              </span>
            </p>
          </div>
          <div className="text-sm">{selectedEvent.description}</div>
        </div>
      )}

      <Button type="submit" onClick={onCreate} disabled={!selectedEvent}>
        Fortfahren
      </Button>
    </div>
  );
}

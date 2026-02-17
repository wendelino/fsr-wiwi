import type React from "react";
import { formatDateTime } from "src/utilities/formatDateTime";

import type { Event } from "@/payload-types";

export const EventHero: React.FC<{
  event: Event;
}> = ({ event }) => {
  const { start, end, location, title } = event;

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container relative z-10 pb-8 text-white lg:grid lg:grid-cols-[1fr_48rem_1fr]">
        <div className="col-span-1 col-start-1 md:col-span-2 md:col-start-2">
          <div className="mb-6 text-sm uppercase opacity-80">Veranstaltung</div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-16">
            {start && (
              <div className="flex flex-col gap-1">
                <p className="text-sm opacity-80">Start</p>
                <time dateTime={start}>{formatDateTime(start)}</time>
              </div>
            )}
            {end && (
              <div className="flex flex-col gap-1">
                <p className="text-sm opacity-80">Ende</p>
                <time dateTime={end}>{formatDateTime(end)}</time>
              </div>
            )}
            {location && (
              <div className="flex flex-col gap-1">
                <p className="text-sm opacity-80">Ort</p>
                <p>{location}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );
};

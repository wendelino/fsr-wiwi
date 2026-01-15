import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Event } from '@/payload-types'

export const EventHero: React.FC<{
  event: Event
}> = ({ event }) => {
  const { start, end, location, title } = event

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6 opacity-80">Veranstaltung</div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
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
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react'

interface CalendarEvent {
  id: string
  summary: string
  description?: string
  start: {
    dateTime?: string
    date?: string
  }
  end: {
    dateTime?: string
    date?: string
  }
  location?: string
  htmlLink: string
}

interface GoogleCalendarEventsProps {
  calendarId: string
  apiKey: string
  maxResults?: number
  showPastEvents?: boolean
}

export function GoogleCalendarEvents({
  calendarId,
  apiKey,
  maxResults = 5,
  showPastEvents = false,
}: GoogleCalendarEventsProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const timeMin = showPastEvents ? undefined : new Date().toISOString()
        const params = new URLSearchParams({
          key: apiKey,
          orderBy: 'startTime',
          singleEvents: 'true',
          maxResults: maxResults.toString(),
          ...(timeMin && { timeMin }),
        })

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`,
        )

        if (!response.ok) {
          throw new Error('Failed to fetch calendar events')
        }

        const data = await response.json()
        setEvents(data.items || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [calendarId, apiKey, maxResults, showPastEvents])

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('de-DE', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Europe/Berlin',
    }).format(date)
  }

  const getCalendarSubscriptionUrl = () => {
    return `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(calendarId)}`
  }

  const handleSubscribe = () => {
    window.open(getCalendarSubscriptionUrl(), '_blank')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800">Fehler beim Laden der Events</CardTitle>
          <CardDescription className="text-red-600">{error}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const nextEvent = events[0]

  return (
    <div className="space-y-6">
      {/* Next Event Highlight */}
      {nextEvent && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle>Nächstes Event</CardTitle>
              </div>
              <Button onClick={handleSubscribe} variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Kalender abonnieren
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">{nextEvent.summary}</h3>
              {nextEvent.description && (
                <p className="text-muted-foreground">{nextEvent.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">
                    {formatDate(nextEvent.start.dateTime || nextEvent.start.date)}
                  </p>
                  {nextEvent.end && (
                    <p className="text-sm text-muted-foreground">
                      bis {formatDate(nextEvent.end.dateTime || nextEvent.end.date)}
                    </p>
                  )}
                </div>
              </div>

              {nextEvent.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <p className="text-sm">{nextEvent.location}</p>
                </div>
              )}
            </div>

            <Button asChild variant="default" className="w-full">
              <a href={nextEvent.htmlLink} target="_blank" rel="noopener noreferrer">
                In Google Calendar öffnen
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Events List */}
      {events.length > 1 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Kommende Events</h3>
          <div className="space-y-2">
            {events.slice(1).map((event) => (
              <Card key={event.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{event.summary}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(event.start.dateTime || event.start.date)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {events.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Keine Events gefunden</CardTitle>
            <CardDescription>
              Es sind derzeit keine anstehenden Events im Kalender.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleSubscribe} variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Kalender abonnieren
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

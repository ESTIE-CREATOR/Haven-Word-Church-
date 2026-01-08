import { getEvents } from "@/lib/supabase/queries/events"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionStagger } from "@/components/motion/MotionStagger"
import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Events</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Join us for our upcoming events and services
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events scheduled at this time.</p>
        </div>
      ) : (
        <MotionStagger>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link key={event.id} href={`/events/${event.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(event.start_date_time), "MMM d, yyyy 'at' h:mm a")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {event.location_name && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        {event.location_name}
                      </div>
                    )}
                    {event.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {event.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </MotionStagger>
      )}
    </div>
  )
}



import { notFound } from "next/navigation"
import { getEventBySlug, getEvents } from "@/lib/supabase/queries/events"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionInView } from "@/components/motion/MotionInView"
import { Calendar, MapPin, Clock } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  try {
    const events = await getEvents()
    return events.map((event) => ({
      slug: event.slug,
    }))
  } catch {
    return []
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let event
  try {
    event = await getEventBySlug(slug)
  } catch (error) {
    notFound()
  }

  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">{event.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {format(new Date(event.start_date_time), "EEEE, MMMM d, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Time</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(event.start_date_time), "h:mm a")}
                      {event.end_date_time &&
                        ` - ${format(new Date(event.end_date_time), "h:mm a")}`}
                    </p>
                  </div>
                </div>

                {event.location_name && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {event.location_name}
                      </p>
                      {event.address && (
                        <p className="text-sm text-muted-foreground">{event.address}</p>
                      )}
                    </div>
                  </div>
                )}

                {event.description && (
                  <div>
                    <p className="font-semibold mb-2">Description</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {event.description}
                    </p>
                  </div>
                )}

                {event.google_cal_url && (
                  <Button asChild>
                    <a href={event.google_cal_url} target="_blank" rel="noopener noreferrer">
                      Add to Calendar
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}


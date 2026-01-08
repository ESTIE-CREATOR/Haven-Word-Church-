import { requireRole } from "@/lib/supabase/auth"
import { getEvents } from "@/lib/supabase/queries/events"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Trash2, Calendar } from "lucide-react"
import { format } from "date-fns"

export default async function AdminEventsPage() {
  await requireRole(["admin"])

  const events = await getEvents()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground">Manage church events</p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Link>
        </Button>
      </div>

      {events.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No events yet.</p>
            <Button asChild>
              <Link href="/admin/events/new">Add Your First Event</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(event.start_date_time), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                    {event.location_name && (
                      <p className="text-sm text-muted-foreground">{event.location_name}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link href={`/admin/events/${event.id}/edit`}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}



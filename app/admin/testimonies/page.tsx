import { requireRole } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { format } from "date-fns"

export default async function AdminTestimoniesPage() {
  await requireRole(["admin"])

  const supabase = await createClient()
  const { data: testimonies } = await supabase
    .from("testimonies")
    .select("*")
    .order("created_at", { ascending: false })

  const pendingTestimonies = testimonies?.filter((t) => t.status === "pending") || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Testimonies Moderation</h1>
        <p className="text-muted-foreground">
          Review and approve testimonies ({pendingTestimonies.length} pending)
        </p>
      </div>

      {pendingTestimonies.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No pending testimonies.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingTestimonies.map((testimony) => (
            <Card key={testimony.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {testimony.title && (
                    <h3 className="text-lg font-semibold">{testimony.title}</h3>
                  )}
                  <p className="text-muted-foreground whitespace-pre-line">
                    {testimony.body}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium">{testimony.name}</p>
                      <p>{format(new Date(testimony.created_at), "MMM d, yyyy")}</p>
                    </div>
                    <div className="flex gap-2">
                      <form action={`/api/admin/testimonies/${testimony.id}/approve`} method="POST">
                        <Button type="submit" size="sm" variant="default">
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </form>
                      <form action={`/api/admin/testimonies/${testimony.id}/reject`} method="POST">
                        <Button type="submit" size="sm" variant="destructive">
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}



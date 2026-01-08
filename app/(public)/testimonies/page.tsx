import { getTestimonies } from "@/lib/supabase/queries/testimonies"
import { Card, CardContent } from "@/components/ui/card"
import { MotionStagger } from "@/components/motion/MotionStagger"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { format } from "date-fns"

export default async function TestimoniesPage() {
  const testimonies = await getTestimonies()

  return (
    <div className="container py-12">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">Testimonies</h1>
          <p className="text-muted-foreground">
            Stories of transformation and faith from our community
          </p>
        </div>
        <Button asChild>
          <Link href="/testimonies/share">Share Your Story</Link>
        </Button>
      </div>

      {testimonies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No testimonies available yet.</p>
          <Button asChild>
            <Link href="/testimonies/share">Be the first to share</Link>
          </Button>
        </div>
      ) : (
        <MotionStagger>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonies.map((testimony) => (
              <Card key={testimony.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  {testimony.title && (
                    <h3 className="text-xl font-semibold">{testimony.title}</h3>
                  )}
                  <p className="text-muted-foreground whitespace-pre-line">
                    {testimony.body}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <p className="font-medium">{testimony.name}</p>
                    <p className="text-muted-foreground">
                      {format(new Date(testimony.created_at), "MMM d, yyyy")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </MotionStagger>
      )}
    </div>
  )
}



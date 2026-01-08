"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  start_date_time: z.string().min(1, "Start date/time is required"),
  end_date_time: z.string().optional(),
  location_name: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  google_cal_url: z.string().url().optional().or(z.literal("")),
})

type EventFormData = z.infer<typeof eventSchema>

export default function NewEventPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  })

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Generate slug from title
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const response = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          slug,
          end_date_time: data.end_date_time || null,
          location_name: data.location_name || null,
          address: data.address || null,
          description: data.description || null,
          google_cal_url: data.google_cal_url || null,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create event")
      }

      router.push("/admin/events")
      router.refresh()
    } catch (err) {
      setError("Failed to create event. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/admin/events">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Add New Event</CardTitle>
          <CardDescription>Create a new church event</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="title">Title *</Label>
              <Input id="title" {...register("title")} placeholder="Event title" />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="start_date_time">Start Date & Time *</Label>
              <Input
                id="start_date_time"
                type="datetime-local"
                {...register("start_date_time")}
              />
              {errors.start_date_time && (
                <p className="text-sm text-destructive mt-1">{errors.start_date_time.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="end_date_time">End Date & Time (Optional)</Label>
              <Input
                id="end_date_time"
                type="datetime-local"
                {...register("end_date_time")}
              />
            </div>

            <div>
              <Label htmlFor="location_name">Location Name (Optional)</Label>
              <Input id="location_name" {...register("location_name")} placeholder="Venue name" />
            </div>

            <div>
              <Label htmlFor="address">Address (Optional)</Label>
              <Input id="address" {...register("address")} placeholder="Full address" />
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Event description"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="google_cal_url">Google Calendar URL (Optional)</Label>
              <Input
                id="google_cal_url"
                type="url"
                {...register("google_cal_url")}
                placeholder="https://calendar.google.com/..."
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}



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
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const audioSchema = z.object({
  title: z.string().min(1, "Title is required"),
  speaker: z.string().min(1, "Speaker name is required"),
  date: z.string().min(1, "Date is required"),
  audio_url: z.string().url("Valid URL is required").optional().or(z.literal("")),
  featured: z.boolean().default(false),
})

type AudioFormData = z.infer<typeof audioSchema>

export default function NewAudioPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AudioFormData>({
    resolver: zodResolver(audioSchema),
    defaultValues: {
      featured: false,
    },
  })

  const onSubmit = async (data: AudioFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Generate slug from title
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const response = await fetch("/api/admin/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          slug,
          audio_url: data.audio_url || null,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create audio message")
      }

      router.push("/admin/audio")
      router.refresh()
    } catch (err) {
      setError("Failed to create audio message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/admin/audio">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Audio
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Add New Audio Message</CardTitle>
          <CardDescription>Upload an audio message</CardDescription>
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
              <Input id="title" {...register("title")} placeholder="Audio message title" />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="speaker">Speaker *</Label>
              <Input id="speaker" {...register("speaker")} placeholder="Speaker name" />
              {errors.speaker && (
                <p className="text-sm text-destructive mt-1">{errors.speaker.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="date">Date *</Label>
              <Input id="date" type="date" {...register("date")} />
              {errors.date && (
                <p className="text-sm text-destructive mt-1">{errors.date.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="audio_url">Audio URL (Optional)</Label>
              <Input
                id="audio_url"
                type="url"
                {...register("audio_url")}
                placeholder="https://example.com/audio.mp3"
              />
              {errors.audio_url && (
                <p className="text-sm text-destructive mt-1">{errors.audio_url.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                {...register("featured")}
                className="rounded"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Featured audio
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Audio Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}



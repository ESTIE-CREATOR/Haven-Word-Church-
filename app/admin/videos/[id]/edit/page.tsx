"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { extractYouTubeId, getYouTubeThumbnail, isValidYouTubeUrl } from "@/lib/utils/youtube"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  preacher: z.string().min(1, "Preacher name is required"),
  preached_at: z.string().min(1, "Date is required"),
  youtube_url: z.string().refine(isValidYouTubeUrl, "Invalid YouTube URL"),
  featured: z.boolean().default(false),
})

type VideoFormData = z.infer<typeof videoSchema>

export default function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>("")
  
  useEffect(() => {
    params.then((p) => setId(p.id))
  }, [params])
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<VideoFormData>({
    resolver: zodResolver(videoSchema),
  })

  const youtubeUrl = watch("youtube_url")
  const videoId = youtubeUrl ? extractYouTubeId(youtubeUrl) : null
  const thumbnailUrl = videoId ? getYouTubeThumbnail(videoId) : null

  useEffect(() => {
    if (!id) return
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/admin/videos/${id}`)
        if (!response.ok) throw new Error("Failed to fetch video")
        const video = await response.json()
        setValue("title", video.title)
        setValue("preacher", video.preacher)
        setValue("preached_at", video.preached_at)
        setValue("youtube_url", video.youtube_url)
        setValue("featured", video.featured)
      } catch (err) {
        setError("Failed to load video")
      } finally {
        setIsLoading(false)
      }
    }
    fetchVideo()
  }, [id, setValue])

  const onSubmit = async (data: VideoFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const videoId = extractYouTubeId(data.youtube_url)
      if (!videoId) {
        setError("Could not extract video ID from URL")
        return
      }

      const response = await fetch(`/api/admin/videos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          youtube_video_id: videoId,
          thumbnail_url: getYouTubeThumbnail(videoId),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update video")
      }

      router.push("/admin/videos")
      router.refresh()
    } catch (err) {
      setError("Failed to update video. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/admin/videos">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Videos
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Video</CardTitle>
          <CardDescription>Update video information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="youtube_url">YouTube URL *</Label>
              <Input
                id="youtube_url"
                {...register("youtube_url")}
                placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
              />
              {errors.youtube_url && (
                <p className="text-sm text-destructive mt-1">{errors.youtube_url.message}</p>
              )}
              {videoId && thumbnailUrl && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                  <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden border">
                    <img
                      src={thumbnailUrl}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="title">Title *</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="preacher">Preacher *</Label>
              <Input id="preacher" {...register("preacher")} />
              {errors.preacher && (
                <p className="text-sm text-destructive mt-1">{errors.preacher.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="preached_at">Date Preached *</Label>
              <Input id="preached_at" type="date" {...register("preached_at")} />
              {errors.preached_at && (
                <p className="text-sm text-destructive mt-1">{errors.preached_at.message}</p>
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
                Featured video
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Video"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


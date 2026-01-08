import { notFound } from "next/navigation"
import { getVideoById, getVideos } from "@/lib/supabase/queries/videos"
import { VideoPlayer } from "@/components/VideoPlayer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionInView } from "@/components/motion/MotionInView"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  try {
    const videos = await getVideos()
    return videos.map((video) => ({
      id: video.id,
    }))
  } catch {
    return []
  }
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let video
  try {
    video = await getVideoById(id)
  } catch (error) {
    notFound()
  }

  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <Button variant="ghost" asChild>
              <Link href="/messages/video">← Back to Videos</Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">{video.title}</CardTitle>
              <p className="text-muted-foreground">
                {video.preacher} • {new Date(video.preached_at).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <VideoPlayer videoId={video.youtube_video_id} title={video.title} />
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}


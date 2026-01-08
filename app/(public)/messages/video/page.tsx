import Link from "next/link"
import Image from "next/image"
import { getVideos } from "@/lib/supabase/queries/videos"
import { Card, CardContent } from "@/components/ui/card"
import { MotionStagger } from "@/components/motion/MotionStagger"
import { Play } from "lucide-react"
import { getYouTubeThumbnail } from "@/lib/utils/youtube"

export default async function VideoMessagesPage() {
  const videos = await getVideos()

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">Video Messages</h1>
        <p className="text-muted-foreground">
          Watch our latest sermons and teachings
        </p>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No videos available yet.</p>
        </div>
      ) : (
        <MotionStagger>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Link key={video.id} href={`/messages/video/${video.id}`}>
                <Card className="hover:shadow-lg transition-all cursor-pointer group overflow-hidden">
                  <div className="relative aspect-video bg-muted">
                    <Image
                      src={video.thumbnail_url}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-primary" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-2 mb-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.preacher}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(video.preached_at).toLocaleDateString()}
                    </p>
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



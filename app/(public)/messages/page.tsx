import Link from "next/link"
import Image from "next/image"
import { getVideos } from "@/lib/supabase/queries/videos"
import { VideoCarousel } from "@/components/VideoCarousel"
import { MotionInView } from "@/components/motion/MotionInView"
import { MotionStagger } from "@/components/motion/MotionStagger"
import { Card, CardContent } from "@/components/ui/card"
import { Play } from "lucide-react"

export default async function MessagesPage() {
  const allVideos = await getVideos()
  
  // Filter videos for "Issues Of Life" (featured videos or videos with "Issues Of Life" in title)
  const issuesOfLifeVideos = allVideos.filter(
    (video) => 
      video.featured || 
      video.title.toLowerCase().includes("issues of life") ||
      video.title.toLowerCase().includes("issue of life")
  )
  
  // Recent messages are all videos (excluding the ones in Issues Of Life if needed)
  // For now, we'll show all videos in Recent Messages
  const recentMessages = allVideos

  return (
    <div className="min-h-screen">
      {/* Issues Of Life Carousel */}
      {issuesOfLifeVideos.length > 0 && (
        <VideoCarousel 
          videos={issuesOfLifeVideos} 
          title="Issues Of Life"
        />
      )}

      {/* Recent Messages Grid */}
      <section className="py-8 md:py-12">
        <div className="container">
          <MotionInView>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Recent Messages</h2>
          </MotionInView>

          {recentMessages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No videos available yet.</p>
            </div>
          ) : (
            <MotionStagger>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentMessages.map((video) => (
                  <Link key={video.id} href={`/messages/video/${video.id}`}>
                    <Card className="hover:shadow-lg transition-all cursor-pointer group overflow-hidden h-full">
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
      </section>
    </div>
  )
}



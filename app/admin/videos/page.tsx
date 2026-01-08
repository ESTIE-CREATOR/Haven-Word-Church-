import { requireRole } from "@/lib/supabase/auth"
import { getVideos } from "@/lib/supabase/queries/videos"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"

export default async function AdminVideosPage() {
  await requireRole(["admin", "media"])

  const videos = await getVideos()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Video Messages</h1>
          <p className="text-muted-foreground">Manage YouTube video messages</p>
        </div>
        <Button asChild>
          <Link href="/admin/videos/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Video
          </Link>
        </Button>
      </div>

      {videos.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No videos yet.</p>
            <Button asChild>
              <Link href="/admin/videos/new">Add Your First Video</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="relative aspect-video bg-muted">
                <Image
                  src={video.thumbnail_url}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-2 mb-2">{video.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{video.preacher}</p>
                <p className="text-xs text-muted-foreground mb-4">
                  {format(new Date(video.preached_at), "MMM d, yyyy")}
                </p>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link href={`/admin/videos/${video.id}/edit`}>
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

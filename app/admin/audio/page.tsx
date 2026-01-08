import { requireRole } from "@/lib/supabase/auth"
import { getAudioMessages } from "@/lib/supabase/queries/audio"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Trash2, Headphones } from "lucide-react"
import { format } from "date-fns"

export default async function AdminAudioPage() {
  await requireRole(["admin", "media"])

  const audioMessages = await getAudioMessages()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Audio Messages</h1>
          <p className="text-muted-foreground">Manage audio message uploads</p>
        </div>
        <Button asChild>
          <Link href="/admin/audio/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Audio
          </Link>
        </Button>
      </div>

      {audioMessages.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No audio messages yet.</p>
            <Button asChild>
              <Link href="/admin/audio/new">Add Your First Audio</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {audioMessages.map((audio) => (
            <Card key={audio.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Headphones className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold line-clamp-2">{audio.title}</h3>
                    <p className="text-sm text-muted-foreground">{audio.speaker}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  {format(new Date(audio.date), "MMM d, yyyy")}
                </p>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link href={`/admin/audio/${audio.id}/edit`}>
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



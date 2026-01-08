import Link from "next/link"
import { getAudioMessages } from "@/lib/supabase/queries/audio"
import { Card, CardContent } from "@/components/ui/card"
import { MotionStagger } from "@/components/motion/MotionStagger"
import { Headphones } from "lucide-react"

export default async function AudioMessagesPage() {
  const audioMessages = await getAudioMessages()

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">Audio Messages</h1>
        <p className="text-muted-foreground">
          Listen to our latest sermons and teachings
        </p>
      </div>

      {audioMessages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No audio messages available yet.</p>
        </div>
      ) : (
        <MotionStagger>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audioMessages.map((audio) => (
              <Link key={audio.id} href={`/messages/audio/${audio.slug}`}>
                <Card className="hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Headphones className="h-8 w-8 text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold line-clamp-2 mb-1">{audio.title}</h3>
                        <p className="text-sm text-muted-foreground">{audio.speaker}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(audio.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
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



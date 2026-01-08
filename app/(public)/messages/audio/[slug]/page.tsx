import { notFound } from "next/navigation"
import { getAudioBySlug, getAudioMessages } from "@/lib/supabase/queries/audio"
import { AudioPlayer } from "@/components/AudioPlayer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionInView } from "@/components/motion/MotionInView"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  try {
    const audioMessages = await getAudioMessages()
    return audioMessages.map((audio) => ({
      slug: audio.slug,
    }))
  } catch {
    return []
  }
}

export default async function AudioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let audio
  try {
    audio = await getAudioBySlug(slug)
  } catch (error) {
    notFound()
  }

  if (!audio.audio_url) {
    return (
      <div className="container py-12">
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">Audio file not available.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <Button variant="ghost" asChild>
              <Link href="/messages/audio">← Back to Audio</Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">{audio.title}</CardTitle>
              <p className="text-muted-foreground">
                {audio.speaker} • {new Date(audio.date).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <AudioPlayer src={audio.audio_url} title={audio.title} />
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}


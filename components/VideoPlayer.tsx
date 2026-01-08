"use client"

interface VideoPlayerProps {
  videoId: string
  title?: string
  className?: string
}

export function VideoPlayer({ videoId, title, className = "" }: VideoPlayerProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <iframe
          src={embedUrl}
          title={title || "Video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  )
}



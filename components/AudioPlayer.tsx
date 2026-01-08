"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "./ui/button"

interface AudioPlayerProps {
  src: string
  title?: string
  className?: string
}

export function AudioPlayer({ src, title, className = "" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg border bg-card ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={togglePlay}
        className="flex-shrink-0"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </Button>
      
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-medium truncate mb-1">{title}</p>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <audio ref={audioRef} src={src} />
    </div>
  )
}



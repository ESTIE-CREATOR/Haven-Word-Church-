"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "./ui/button"
import type { Video } from "@/lib/types/database"

interface VideoCarouselProps {
  videos: Video[]
  title: string
  className?: string
}

export function VideoCarousel({ videos, title, className = "" }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (videos.length === 0) return null

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className={`py-8 md:py-12 ${className}`}>
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>
        
        <div className="relative">
          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {videos.map((video) => (
                <div key={video.id} className="min-w-full px-2">
                  <Link href={`/messages/video/${video.id}`}>
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden group cursor-pointer">
                      <Image
                        src={video.thumbnail_url}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-4 md:p-6 group-hover:scale-110 transition-transform">
                          <Play className="h-8 w-8 md:h-12 md:w-12 text-primary" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="text-white font-semibold text-lg md:text-xl line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-white/80 text-sm mt-1">{video.preacher}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {videos.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Pagination Dots */}
          {videos.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}











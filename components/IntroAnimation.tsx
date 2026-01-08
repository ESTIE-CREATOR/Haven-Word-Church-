"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

// Register TextPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin)
}

interface IntroAnimationProps {
  onComplete: () => void
}

const CHURCH_IMAGES = [
  "/pictures/church_pictures/photo_2026-01-03_01-50-05.jpg",
  "/pictures/church_pictures/photo_2026-01-03_01-50-13.jpg",
  "/pictures/church_pictures/photo_2026-01-03_01-50-20.jpg",
  "/pictures/church_pictures/photo_2026-01-03_01-50-25.jpg",
  "/pictures/church_pictures/photo_2026-01-03_01-50-35.jpg",
  "/pictures/church_pictures/photo_2026-01-03_01-50-40.jpg",
  "/pictures/church_pictures/photo_2026-01-03_01-50-47.jpg",
  "/pictures/church_pictures/photo_2026-01-03_01-50-52.jpg",
  "/pictures/church_pictures/photo_2026-01-03_01-50-57.jpg",
  "/pictures/church_pictures/photo_2026-01-03_01-51-03.jpg",
  "/pictures/church_pictures/photo_2026-01-03_01-51-07.jpg",
  "/pictures/church_pictures/photo_2026-01-03_01-51-11.jpg",
]

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const introRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!introRef.current || !textRef.current) return

    const ctx = gsap.context(() => {
      // Get the text element
      const textElement = textRef.current?.querySelector("h1")
      const subtitleElement = subtitleRef.current
      if (!textElement) return

      // Get background images container
      const backgroundImages = backgroundRef.current?.querySelectorAll(".bg-image")
      if (!backgroundImages || backgroundImages.length === 0) return
      
      // Check if mobile based on window width
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768

      // Initial setup - hide text
      textElement.textContent = ""
      gsap.set(textElement, {
        opacity: 0,
        y: 20,
      })

      // Initial setup - hide subtitle
      if (subtitleElement) {
        gsap.set(subtitleElement, {
          opacity: 0,
          y: 20,
        })
      }

      // Set initial position for images - stack them vertically
      // Each image is positioned at 100vh intervals (0%, 100%, 200%, etc.)
      const imageCount = backgroundImages.length
      const scrollDuration = isMobile ? 0.8 : 1.2 // Faster on mobile
      
      backgroundImages.forEach((img, index) => {
        const yPosition = index * 100
        // Use transform instead of percentage for more reliable positioning
        gsap.set(img, {
          y: `${yPosition}%`,
          force3D: true, // Enable hardware acceleration
        })
        
        // Start scrolling immediately for each image - independent of text animation
        const imgTL = gsap.timeline({ 
          repeat: -1,
          paused: false,
          immediateRender: true
        })
        
        // Calculate total scroll distance (all images stacked)
        const totalScroll = imageCount * 100
        
        // Scroll image up continuously
        imgTL.to(img, {
          y: `${yPosition - totalScroll}%`,
          duration: scrollDuration * imageCount,
          ease: "none",
        })
        
        // Reset to start position for seamless loop
        imgTL.set(img, {
          y: `${yPosition}%`,
        })
      })

      // Create timeline for text animation
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true)
          // Small delay before calling onComplete to ensure fade is done
          setTimeout(() => {
            onComplete()
          }, 500)
        },
      })

      // Fade in text container
      tl.to(textElement, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })

      // Type out the full text first
      tl.to(textElement, {
        duration: 2.5,
        text: {
          value: "WELCOME TO HAVEN WORD CHURCH",
          delimiter: "",
        },
        ease: "none",
      })
      
      // After typing, apply blue color to "HAVEN WORD CHURCH"
      tl.call(() => {
        const fullText = textElement.textContent || ""
        const welcomePart = "WELCOME TO "
        const havenPart = "HAVEN WORD CHURCH"
        
        if (fullText.includes(havenPart)) {
          textElement.innerHTML = `${welcomePart}<span style="color: #3B82F6;">${havenPart}</span>`
        }
      })

      // Add animation effects to the text (pulse/scale effect)
      tl.to(textElement, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(textElement, {
        scale: 1,
        duration: 0.3,
        ease: "power2.in",
      })

      // Fade in and animate subtitle "...the spread city..."
      if (subtitleElement) {
        tl.to(subtitleElement, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.2") // Start slightly before main text animation ends
      }

      // Hold for a moment while images scroll
      tl.to({}, { duration: 1.5 })

      // Fade out intro overlay
      tl.to(introRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.in",
      })
    }, introRef)

    return () => {
      ctx.revert()
    }
  }, [onComplete])

  // Hide component after animation completes
  if (isComplete) {
    return null
  }

  return (
    <div
      ref={introRef}
      className="fixed inset-0 z-[9999] bg-white"
      style={{ pointerEvents: isComplete ? "none" : "auto" }}
    >
      <div className="flex flex-row h-full w-full relative">
        {/* Logo at top left */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
          <div className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 relative">
            <Image
              src="/pictures/logo/20260103_114553_0000.png"
              alt="Haven Word Church Logo"
              width={80}
              height={80}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Left Side - Text with White Background */}
        <div className="flex-1 h-full bg-white flex items-center justify-center pt-20 md:pt-0">
          <div
            ref={textRef}
            className="text-center px-4 md:px-8"
          >
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-wider"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', 'Georgia', serif" }}
            >
              {/* Text will be typed here by GSAP */}
            </h1>
            <div
              ref={subtitleRef}
              className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl text-black/70 italic"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', 'Georgia', serif" }}
            >
              ...the spread city...
            </div>
          </div>
        </div>

        {/* Right Side - Scrolling Images with padding - Visible on all screen sizes */}
        <div className="flex h-full">
          <div
            ref={backgroundRef}
            className="relative w-32 sm:w-40 md:w-52 lg:w-64 h-full overflow-hidden"
          >
            {CHURCH_IMAGES.map((image, index) => (
              <div
                key={index}
                className="bg-image absolute left-0 w-full"
                style={{
                  height: "100vh",
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ))}
          </div>
          {/* White padding on the right */}
          <div className="w-4 sm:w-6 md:w-8 lg:w-12 bg-white" />
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { IntroAnimation } from "./IntroAnimation"

interface IntroWrapperProps {
  children: React.ReactNode
}

export function IntroWrapper({ children }: IntroWrapperProps) {
  const [showIntro, setShowIntro] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleIntroComplete = () => {
    setShowIntro(false)
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowContent(true)
    }, 100)
  }

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <div
        className={`transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
        style={{ visibility: showContent ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </>
  )
}


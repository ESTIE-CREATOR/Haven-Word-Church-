"use client"

import { motion } from "framer-motion"
import { ReactNode, useState } from "react"

interface MarqueeProps {
  children: ReactNode[]
  className?: string
  speed?: number
  direction?: "left" | "right"
}

export function Marquee({
  children,
  className = "",
  speed = 50,
  direction = "left",
}: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false)

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (prefersReducedMotion) {
    return (
      <div className={`flex gap-8 ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-8"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          ...(isPaused && { repeatDelay: 0 }),
        }}
        style={{
          width: "max-content",
        }}
      >
        {/* Duplicate children for seamless loop */}
        {children}
        {children}
      </motion.div>
    </div>
  )
}



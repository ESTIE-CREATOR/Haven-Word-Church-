"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"

interface MotionInViewProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function MotionInView({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
}: MotionInViewProps) {
  const ref = useRef(null)
  // Remove 'once: true' to allow fade in/out on scroll
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 }
      }
      transition={{
        duration: duration || 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}



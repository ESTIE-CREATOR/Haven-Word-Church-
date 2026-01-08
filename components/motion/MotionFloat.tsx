"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface MotionFloatProps {
  children: ReactNode
  className?: string
  duration?: number
  delay?: number
}

export function MotionFloat({
  children,
  className = "",
  duration = 6,
  delay = 0,
}: MotionFloatProps) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        x: [0, 5, 0],
      }}
      transition={{
        duration: duration || 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}



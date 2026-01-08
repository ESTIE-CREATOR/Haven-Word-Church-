"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface MotionStaggerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  duration?: number
}

export function MotionStagger({
  children,
  className = "",
  staggerDelay = 0.1,
  duration = 0.6,
}: MotionStaggerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration || 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}



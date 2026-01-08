"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function CountUp({
  value,
  duration = 2,
  className = "",
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const displayValue = useTransform(spring, (latest) => Math.round(latest))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (latest) => {
      setDisplay(latest)
    })
    return unsubscribe
  }, [displayValue])

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  )
}


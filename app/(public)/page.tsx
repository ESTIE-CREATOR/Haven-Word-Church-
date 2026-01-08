"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionInView } from "@/components/motion/MotionInView"
import { MotionStagger } from "@/components/motion/MotionStagger"
import { MotionFloat } from "@/components/motion/MotionFloat"
import { Play, Headphones, MapPin, Users, Heart } from "lucide-react"
import { motion, useInView } from "framer-motion"

// Service Flier Component with slide-in animation
function ServiceFlier({ src, alt, direction }: { src: string; alt: string; direction: "left" | "right" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const xValue = direction === "left" ? -100 : 100
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xValue }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: xValue }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="flex-1"
    >
      <div className="relative w-full aspect-[3/4] max-h-[600px] hover:shadow-xl transition-shadow overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          priority
        />
      </div>
    </motion.div>
  )
}

export default function Home() {
  const servicesRef = useRef<HTMLHeadingElement>(null)
  const [overlayHeight, setOverlayHeight] = useState("100vh")

  useEffect(() => {
    const updateOverlayHeight = () => {
      if (servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect()
        const height = rect.top + window.scrollY
        setOverlayHeight(`${height}px`)
      }
    }

    // Initial calculation
    setTimeout(updateOverlayHeight, 100)
    
    window.addEventListener("resize", updateOverlayHeight)
    window.addEventListener("scroll", updateOverlayHeight)

    return () => {
      window.removeEventListener("resize", updateOverlayHeight)
      window.removeEventListener("scroll", updateOverlayHeight)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center pb-16 bg-black">
        {/* Blue Overlay - starts from top, ends before "Our Services" text */}
        <div 
          className="fixed top-0 left-0 right-0 -z-10 bg-blue-900/60"
          style={{ height: overlayHeight }}
        ></div>
        
        <div className="container relative z-10 px-4 flex items-center justify-center min-h-screen py-20">
          <MotionInView className="text-center space-y-6 w-full">
            {/* Spread City Logo with Contrasting Colors - Centered in middle of screen */}
            <div className="flex justify-center mb-6 md:mb-10">
              <div className="relative inline-block">
                <Image
                  src="/pictures/spread_city/20260103_114554_0001.png"
                  alt="The Spread City"
                  width={600}
                  height={200}
                  className="w-full max-w-lg md:max-w-xl h-auto object-contain drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.6))",
                  }}
                  priority
                />
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-2 md:pt-4">
              <Button asChild size="lg">
                <Link href="/locations">Find Our Branch</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/messages/video">Watch Messages</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/messages/audio">Listen to Audio</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/giving">Give</Link>
              </Button>
            </div>
          </MotionInView>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 relative bg-white">
        <div className="container">
          <MotionInView duration={0.8}>
            <h2 ref={servicesRef} className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          </MotionInView>
          
          <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
            {/* Bible Study - Wednesday Service - slides from left */}
            <ServiceFlier 
              src="/pictures/services_fliers/wednessday.jpg"
              alt="Bible Study - Wednesday Service"
              direction="left"
            />

            {/* Sunday Services - slides from right */}
            <ServiceFlier 
              src="/pictures/services_fliers/sunday.jpg"
              alt="Sunday Worship Services"
              direction="right"
            />
          </div>
        </div>
      </section>

      {/* Latest Messages */}
      <section className="py-16 bg-white">
        <div className="container">
          <MotionInView>
            <h2 className="text-3xl font-bold text-center mb-12">Latest Messages</h2>
          </MotionInView>
          
          <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
            {/* Latest Video - Left Side */}
            <MotionInView className="flex-1">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary">
                    <Play className="h-5 w-5" />
                    <CardTitle>Latest Video</CardTitle>
                  </div>
                  <CardDescription>Watch our most recent sermon</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/messages/video">Watch Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </MotionInView>
            
            {/* Latest Audio - Right Side */}
            <MotionInView className="flex-1">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 text-secondary">
                    <Headphones className="h-5 w-5" />
                    <CardTitle>Latest Audio</CardTitle>
                  </div>
                  <CardDescription>Listen to our most recent message</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/messages/audio">Listen Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </MotionInView>
          </div>
        </div>
      </section>

      {/* Location CTA */}
      <section className="py-16 bg-white">
        <div className="container">
          <MotionInView>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  <CardTitle>Our Location</CardTitle>
                </div>
                <CardDescription>
                  Join us for worship at our Ibadan branch
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Opposite Gate 5, Behind Adamasingba Stadium<br />
                  Ibadan, Oyo State, Nigeria
                </p>
                <div className="space-y-2">
                  <p className="font-semibold">Service Times:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Sunday: 7:30am (First Service), 10:00am (Second Service)</li>
                    <li>Wednesday: 5:30pm (Bible Study)</li>
                  </ul>
                </div>
                <Button asChild className="w-full">
                  <Link href="/locations">Get Directions</Link>
                </Button>
              </CardContent>
            </Card>
          </MotionInView>
        </div>
      </section>

      {/* Leadership Highlight */}
      <section className="py-16 bg-white">
        <div className="container">
          <MotionInView>
            <Card className="max-w-4xl mx-auto overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6">
                {/* Image on left for sm and above */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex-shrink-0">
                  <Image
                    src="/pictures/pastor/photo_2026-01-07_15-42-34.jpg"
                    alt="Pastor Anthonia Amadi"
                    fill
                    className="object-cover rounded-full"
                    priority
                  />
                </div>
                
                {/* Text content on right for sm and above */}
                <div className="flex-1 text-center sm:text-left">
                  <CardHeader className="px-0 pt-0">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <Users className="h-6 w-6 text-primary" />
                      <CardTitle>Our Pastor</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 px-0">
                    <p className="text-lg font-semibold">Pastor Anthonia Amadi</p>
                    <p className="text-muted-foreground">
                      Leading with passion and purpose to spread the Word of God.
                    </p>
                    <div className="flex justify-center sm:justify-start">
                      <Button asChild variant="outline">
                        <Link href="/about/leadership">Learn More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </MotionInView>
        </div>
      </section>

      {/* Telegram Prayer Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <MotionInView>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  {/* Text Content */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Join Our Telegram Channel
                    </h2>
                    <p className="text-lg text-muted-foreground mb-2">
                      Join us for daily prayers
                    </p>
                    <p className="text-lg font-semibold text-primary mb-6">
                      5:00 AM - 6:00 AM Everyday
                    </p>
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                      <Link href="https://t.me/havenwordchurch" target="_blank" rel="noopener noreferrer">
                        Join Telegram Channel
                      </Link>
                    </Button>
                  </div>

                  {/* Animated Heart */}
                  <div className="flex-shrink-0">
                    <div className="relative w-48 h-48 md:w-64 md:h-64">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Animated glowing heart outline */}
                        <path
                          d="M100,180 C100,180 20,120 20,80 C20,50 40,30 70,30 C85,30 100,45 100,60 C100,45 115,30 130,30 C160,30 180,50 180,80 C180,120 100,180 100,180 Z"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="4"
                          className="heart-outline"
                          style={{
                            filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))",
                          }}
                        />
                        {/* Animated light effect going around the heart */}
                        <path
                          d="M100,180 C100,180 20,120 20,80 C20,50 40,30 70,30 C85,30 100,45 100,60 C100,45 115,30 130,30 C160,30 180,50 180,80 C180,120 100,180 100,180 Z"
                          fill="none"
                          stroke="#60A5FA"
                          strokeWidth="6"
                          strokeDasharray="15 10"
                          strokeLinecap="round"
                          className="heart-glow"
                          style={{
                            filter: "drop-shadow(0 0 12px rgba(96, 165, 250, 0.8))",
                          }}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionInView>
        </div>
      </section>

      {/* Testimonies Preview */}
      <section className="py-16 bg-white">
        <div className="container">
          <MotionInView>
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2">
                <Heart className="h-6 w-6 text-secondary" />
                <h2 className="text-3xl font-bold">Testimonies</h2>
              </div>
              <p className="text-muted-foreground">
                Read stories of transformation and faith from our community
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/testimonies">Read Testimonies</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/testimonies/share">Share Your Story</Link>
                </Button>
              </div>
            </div>
          </MotionInView>
        </div>
      </section>
    </div>
  )
}



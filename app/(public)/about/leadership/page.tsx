import Image from "next/image"
import { MotionInView } from "@/components/motion/MotionInView"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function LeadershipPage() {
  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">Our Leadership</h1>
            <p className="text-muted-foreground">
              Meet the team leading Haven Word Church
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="relative w-full h-80 md:h-96">
              <Image
                src="/pictures/pastor/photo_2026-01-07_15-42-34.jpg"
                alt="Pastor Anthonia Amadi"
                fill
                className="object-cover"
                priority
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Pastor Anthonia Amadi</CardTitle>
              </div>
              <CardDescription>Senior Pastor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Pastor Anthonia Amadi is the Senior Pastor of Haven Word Church, Ibadan. With a passion for spreading the Word of God and raising up preachers, she leads with wisdom, grace, and a heart for the lost.
              </p>
              <p className="text-muted-foreground">
                Under her leadership, Haven Word Church has grown into a vibrant community committed to the mission of raising a multitude of preachers in countless cities. Her teaching is marked by clarity, practical application, and a deep love for God's Word.
              </p>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}



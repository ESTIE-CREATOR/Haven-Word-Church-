import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MotionStagger } from "@/components/motion/MotionStagger"
import { Target, Eye, Users, FileText } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">About Haven Word Church</h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          The Spread City - Raising a multitude of preachers in countless cities
        </p>
      </div>

      <MotionStagger>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link href="/about/mission">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <Target className="h-6 w-6" />
                  <CardTitle>Our Mission</CardTitle>
                </div>
                <CardDescription>
                  Discover what drives us forward
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/about/vision">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <Eye className="h-6 w-6" />
                  <CardTitle>Our Vision</CardTitle>
                </div>
                <CardDescription>
                  See where we're heading
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/about/leadership">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <Users className="h-6 w-6" />
                  <CardTitle>Leadership</CardTitle>
                </div>
                <CardDescription>
                  Meet our pastoral team
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/about/governance">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <FileText className="h-6 w-6" />
                  <CardTitle>Governance</CardTitle>
                </div>
                <CardDescription>
                  Our policies and structure
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </MotionStagger>
    </div>
  )
}



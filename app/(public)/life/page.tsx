import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionStagger } from "@/components/motion/MotionStagger"
import { Users, Droplets, Calendar, Heart, Baby } from "lucide-react"

export default function LifePage() {
  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">Faith & Life</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Resources and information to help you grow in your faith journey
        </p>
      </div>

      <MotionStagger>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Link href="/life/kgroup">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <Users className="h-6 w-6" />
                  <CardTitle>K-Groups</CardTitle>
                </div>
                <CardDescription>
                  Join a small group community
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/life/baptism">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <Droplets className="h-6 w-6" />
                  <CardTitle>Baptism</CardTitle>
                </div>
                <CardDescription>
                  Learn about water baptism
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/life/fasting">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <Calendar className="h-6 w-6" />
                  <CardTitle>Fasting</CardTitle>
                </div>
                <CardDescription>
                  Resources on fasting and prayer
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/life/marriage">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <Heart className="h-6 w-6" />
                  <CardTitle>Marriage</CardTitle>
                </div>
                <CardDescription>
                  Marriage and family resources
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/life/children">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <Baby className="h-6 w-6" />
                  <CardTitle>Children</CardTitle>
                </div>
                <CardDescription>
                  Children's ministry
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </MotionStagger>
    </div>
  )
}



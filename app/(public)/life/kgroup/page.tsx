import { MotionInView } from "@/components/motion/MotionInView"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function KGroupPage() {
  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8 space-y-6">
              <h1 className="text-2xl md:text-3xl font-semibold">K-Groups</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg">
                  K-Groups are small group communities where believers gather to study God's Word, pray together, and build meaningful relationships.
                </p>
                <p className="text-muted-foreground">
                  Join a K-Group near you and experience the power of community in your faith journey.
                </p>
              </div>
              <Button asChild>
                <Link href="/contact">Contact Us to Join</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}



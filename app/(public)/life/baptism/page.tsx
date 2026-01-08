import { MotionInView } from "@/components/motion/MotionInView"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BaptismPage() {
  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8 space-y-6">
              <h1 className="text-2xl md:text-3xl font-semibold">Baptism</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg">
                  Water baptism is an important step of obedience for every believer. It's a public declaration of your faith in Jesus Christ.
                </p>
                <p className="text-muted-foreground">
                  If you're ready to be baptized, we'd love to help you take this important step in your faith journey.
                </p>
              </div>
              <Button asChild>
                <Link href="/contact">Contact Us About Baptism</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}



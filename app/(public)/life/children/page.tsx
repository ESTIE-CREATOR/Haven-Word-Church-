import { MotionInView } from "@/components/motion/MotionInView"
import { Card, CardContent } from "@/components/ui/card"

export default function ChildrenPage() {
  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8 space-y-6">
              <h1 className="text-2xl md:text-3xl font-semibold">Children's Ministry</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg">
                  Our children's ministry is dedicated to teaching kids about Jesus in fun, engaging ways. We provide age-appropriate lessons and activities that help children grow in their faith.
                </p>
                <p className="text-muted-foreground">
                  Join us during our services as we invest in the next generation of believers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}



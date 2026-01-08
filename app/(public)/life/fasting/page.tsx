import { MotionInView } from "@/components/motion/MotionInView"
import { Card, CardContent } from "@/components/ui/card"

export default function FastingPage() {
  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8 space-y-6">
              <h1 className="text-2xl md:text-3xl font-semibold">Fasting & Prayer</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg">
                  Fasting is a spiritual discipline that helps us draw closer to God and seek His will. Combined with prayer, it's a powerful tool for spiritual growth.
                </p>
                <p className="text-muted-foreground">
                  We regularly engage in corporate fasting and prayer as a church. Join us as we seek God together.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}



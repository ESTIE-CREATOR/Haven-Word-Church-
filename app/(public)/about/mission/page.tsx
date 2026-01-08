import { MotionInView } from "@/components/motion/MotionInView"
import { Card, CardContent } from "@/components/ui/card"

export default function MissionPage() {
  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8 space-y-6">
              <h1 className="text-2xl md:text-3xl font-semibold">Our Mission</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg">
                  At Haven Word Church, our mission is to spread the Word of God and raise a multitude of preachers in countless cities. We are committed to:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Proclaiming the Gospel with clarity and passion</li>
                  <li>• Equipping believers for ministry and service</li>
                  <li>• Building strong communities of faith</li>
                  <li>• Reaching out to the lost and broken</li>
                  <li>• Raising up leaders who will impact their cities</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}



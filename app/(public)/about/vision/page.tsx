import { MotionInView } from "@/components/motion/MotionInView"
import { Card, CardContent } from "@/components/ui/card"

export default function VisionPage() {
  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8 space-y-6">
              <h1 className="text-2xl md:text-3xl font-semibold">Our Vision</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg">
                  Our vision is to be The Spread City - a movement that raises a multitude of preachers in countless cities across the world. We envision:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• A network of thriving churches in every major city</li>
                  <li>• Thousands of trained preachers spreading the Gospel</li>
                  <li>• Transformed communities through the power of God's Word</li>
                  <li>• A generation of believers equipped for every good work</li>
                  <li>• A legacy of faith that impacts generations to come</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}


